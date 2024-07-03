import Block from "./Block";
import Ship from "./Ship";
import getRandomNumInRange from "./utils/getRandomNumInRange";

class Board {
  #generateBoardBody() {
    const body = [];
    const numOfRows = 10;
    const numOfBlocks = 10;

    for (let i = 0; i < numOfRows; i++) {
      body[i] = [];

      for (let j = 0; j < numOfBlocks; j++) {
        body[i].push(new Block());
      }
    }

    return body;
  }

  #generateShipCords(
    startRowIndex,
    startBlockIndex,
    shipSize,
    orientation = "horizontal",
  ) {
    let cords = [];

    for (let i = 0; i < shipSize; i++) {
      switch (orientation) {
        case "horizontal":
          cords.push([startRowIndex, startBlockIndex + i]);
          break;
        case "vertical":
          cords.push([startRowIndex + i, startBlockIndex]);
          break;
        default:
          cords = [];
          break;
      }
    }

    return cords;
  }

  #getBlock(body, cord) {
    const [rowIndex, blockIndex] = cord;
    return body[rowIndex][blockIndex];
  }

  #getIsCordInbound(cord = []) {
    const [rowIndex, blockIndex] = cord;
    const boardSize = 10;

    const isRowInbound = rowIndex >= 0 && rowIndex < boardSize;
    if (!isRowInbound) return false;

    const isBlockInbound = blockIndex >= 0 && blockIndex < boardSize;
    if (!isBlockInbound) return false;

    // cordinate inbound
    return true;
  }

  #getIsCordOccupiable(body, cord = []) {
    const isCordInbound = this.#getIsCordInbound(cord);
    if (!isCordInbound) return false;

    const block = this.#getBlock(body, cord);
    const isShipPresentInBlock = Boolean(block.ship);
    if (isShipPresentInBlock) return false;

    // check if any ship is within one block radius from the cord
    const [rowIndex, blockIndex] = cord;

    const radiusCords = {
      topLeft: [rowIndex - 1, blockIndex - 1],
      top: [rowIndex - 1, blockIndex],
      topRight: [rowIndex - 1, blockIndex + 1],
      right: [rowIndex, blockIndex + 1],
      rightBottom: [rowIndex + 1, blockIndex + 1],
      bottom: [rowIndex + 1, blockIndex],
      bottomLeft: [rowIndex + 1, blockIndex - 1],
      left: [rowIndex, blockIndex - 1],
    };

    // checking for ship in each raduis block
    for (const cordKey in radiusCords) {
      const cordValue = radiusCords[cordKey];

      const isCordInbound = this.#getIsCordInbound(cordValue);
      if (!isCordInbound) continue; // to next cord

      const block = this.#getBlock(body, cordValue);
      const isShipInBlock = Boolean(block.ship);
      if (isShipInBlock) return false; // cordinate is not occupiable
    }

    // loop completes mean cordinate is occupiable
    return true;
  }

  #areCordsOccupiable(body, cords) {
    for (let i = 0; i < cords.length; i++) {
      const cord = cords[i];

      // check if another ship is already present within one block from the cordinate
      const isOccupiable = this.#getIsCordOccupiable(body, cord);
      if (!isOccupiable) return false;
    }

    // cordinates occupiable
    return true;
  }

  #getRandomShipOrientation = () => {
    return Math.random() > 0.5 ? "horizontal" : "vertical";
  };

  // generates 10 ships
  #generateShips() {
    const ships = [];

    let shipQuantity = 4;
    let shipSize = 1;

    while (ships.length < 10) {
      for (let i = 0; i < shipQuantity; i++) {
        ships.push(new Ship(shipSize));
      }

      shipQuantity -= 1;
      shipSize += 1;
    }

    return ships;
  }

  // get cords that are occupibale
  #generateOccupiableCords(body, shipSize) {
    let cords = [];
    let areCordsOccupiable = false;

    while (!areCordsOccupiable) {
      const startRowIndex = getRandomNumInRange(0, 9);
      const startBlockIndex = getRandomNumInRange(0, 9);
      const orientation = this.#getRandomShipOrientation();

      cords = this.#generateShipCords(
        startRowIndex,
        startBlockIndex,
        shipSize,
        orientation,
      );
      areCordsOccupiable = this.#areCordsOccupiable(body, cords);
    }

    // loop ends mean we successfuly generated the cords
    return cords;
  }

  #placeShip(body, ship, cords = []) {
    cords.forEach(([rowIndex, blockInex]) => {
      const block = body[rowIndex][blockInex];
      block.ship = ship; // assigning the block' ship property to be the argument ship
    });
  }

  // places 10 ships on board on random cordinates
  #placeShips(body) {
    const ships = this.#generateShips();

    ships.forEach((ship) => {
      const cords = this.#generateOccupiableCords(body, ship.size);
      // place ship on cords
      this.#placeShip(body, ship, cords);
    });
  }

  // generate board body and place ships on it
  #body = this.#generateBoardBody();

  #areShipsPlacedOnBoard = false;

  get body() {
    if (!this.#areShipsPlacedOnBoard) {
      this.#placeShips(this.#body);
      this.#areShipsPlacedOnBoard = true;
    }
    return this.#body;
  }

  attack(rowIndex, blockIndex) {
    const block = this.body[rowIndex][blockIndex];

    if (!block.isAttacked && block.ship) {
      block.ship.getHit();
    }

    block.isAttacked = true; // mark the block as attacked
  }

  get numberOfAvailableShips() {
    const foundShips = new Set();

    this.body.forEach((row) =>
      row.forEach((block) => {
        const ship = block.ship;

        if (ship && !ship.isSunk) foundShips.add(ship);
      }),
    );

    return foundShips.size;
  }
}

export default Board;

// helper func to generate some cords
// helepr func to get blocks from board using given cordinates
export const getBoardBlocks = (boardBody, cords = []) => {
  return cords.map(([nthRow, nthBlock]) => boardBody[nthRow][nthBlock]);
};

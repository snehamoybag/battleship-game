import Block from "./Block";

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

  #body = this.#generateBoardBody();

  get body() {
    return this.#body;
  }

  #getBlock(cord) {
    const [rowIndex, blockIndex] = cord;
    return this.body[rowIndex][blockIndex];
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

  #getIsCordOccupiable(cord = []) {
    const isCordInbound = this.#getIsCordInbound(cord);
    if (!isCordInbound) return false;

    const block = this.#getBlock(cord);
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

      const block = this.#getBlock(cordValue);
      const isShipInBlock = Boolean(block.ship);
      if (isShipInBlock) return false; // cordinate is not occupiable
    }

    // loop completes mean cordinate is occupiable
    return true;
  }

  areCordsOccupiable(cords) {
    for (let i = 0; i < cords.length; i++) {
      const cord = cords[i];

      // check if another ship is already present within one block from the cordinate
      const isOccupiable = this.#getIsCordOccupiable(cord);
      if (!isOccupiable) return false;
    }

    // cordinates occupiable
    return true;
  }

  placeShip(ship, cords = []) {
    cords.forEach(([rowIndex, blockInex]) => {
      const block = this.body[rowIndex][blockInex];
      block.ship = ship; // assigning the block' ship property to be the argument ship
    });
  }

  attack(nthRow, nthBlock) {
    const block = this.body[nthRow][nthBlock];

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
export const generateShipCords = (
  startRow,
  startBlock,
  shipSize,
  orientation = "horizontal",
) => {
  let cords = [];

  for (let i = 0; i < shipSize; i++) {
    switch (orientation) {
      case "horizontal":
        cords.push([startRow, startBlock + i]);
        break;
      case "vertical":
        cords.push([startRow + i, startBlock]);
        break;
      default:
        cords = [];
        break;
    }
  }

  return cords;
};

// helepr func to get blocks from board using given cordinates
export const getBoardBlocks = (boardBody, cords = []) => {
  return cords.map(([nthRow, nthBlock]) => boardBody[nthRow][nthBlock]);
};

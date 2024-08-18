import isInbound from "../helpers/isInbound";
import Ship from "./Ship";

class Gameboard {
  #generateBoard() {
    const size = 10;
    const board = [];

    for (let i = 0; i < size; i++) {
      // create rows
      board[i] = [];

      for (let j = 0; j < size; j++) {
        // create columns/blocks
        board[i][j] = {
          cordinate: [i, j],
          isAttacked: false,
          isRevealed: false,
          ship: null,
        };
      }
    }

    return board;
  }

  #board = this.#generateBoard(); // to generate board only once

  #getSurroundingCordinates(currentCordinate) {
    const [nthRow, nthColumn] = currentCordinate;

    const surroundingCordinates = {
      top: [nthRow - 1, nthColumn],
      topLeft: [nthRow - 1, nthColumn - 1],
      topRight: [nthRow - 1, nthColumn + 1],
      right: [nthRow, nthColumn + 1],
      bottom: [nthRow + 1, nthColumn],
      bottomLeft: [nthRow + 1, nthColumn - 1],
      botomRight: [nthRow + 1, nthColumn + 1],
      left: [nthRow, nthColumn - 1],
    };

    const surroundingCordinatesArr = Object.values(surroundingCordinates);
    return surroundingCordinatesArr;
  }

  #isCordinateValid(cordinate = []) {
    const minNum = 0;
    const maxNum = this.#board.length - 1;

    return isInbound(minNum, maxNum, cordinate);
  }

  #isCordinatePreOccupied(cordinate) {
    const [nthRow, nthColumn] = cordinate;
    return this.#board[nthRow][nthColumn].ship instanceof Ship;
  }

  #areCordinatesPreOccupied(cordinates = []) {
    return cordinates.some((cordinate) =>
      this.#isCordinatePreOccupied(cordinate),
    );
  }

  #isCordinateOverlapping(cordinate) {
    const surroundingCordinates = this.#getSurroundingCordinates(cordinate);

    // check if some cordinates have ship in it
    const isOverlapping = surroundingCordinates.some((cordinate) => {
      if (!this.#isCordinateValid(cordinate)) return false; // invalid cordinate has no ship

      return this.#isCordinatePreOccupied(cordinate);
    });

    return isOverlapping;
  }

  // check if any cordinates is overlaping another ship
  #areCordinatesOverlapping(cordinates = []) {
    return cordinates.some((cordinate) =>
      this.#isCordinateOverlapping(cordinate),
    );
  }

  get board() {
    return this.#board;
  }

  areCordinatesValid(cordinates = []) {
    if (cordinates.length < 1) return false;
    return cordinates.every((cordinate) => this.#isCordinateValid(cordinate));
  }

  areCordinatesFree(cordinates = []) {
    if (!this.areCordinatesValid(cordinates)) return false;

    if (this.#areCordinatesPreOccupied(cordinates)) return false;
    if (this.#areCordinatesOverlapping(cordinates)) return false;

    return true;
  }

  placeShip(cordinates = []) {
    const board = this.board;
    const ship = new Ship(cordinates.length);
    ship.occupiedCordinates = cordinates;

    // place ship on the cordinates
    cordinates.forEach(([nthRow, nthColumn]) => {
      board[nthRow][nthColumn].ship = ship;
    });
  }

  removeAllShips() {
    this.board.forEach((row) =>
      row.forEach((column) => {
        column.ship = null;
      }),
    );
  }

  recieveAttack(nthRow, nthColumn) {
    const board = this.board;
    const block = board[nthRow][nthColumn];

    block.isAttacked = true;

    if (block.ship) {
      block.ship.hit();
    }
  }

  revealSurroundingBlocks(cordinate) {
    const surroundingCordinates = this.#getSurroundingCordinates(cordinate);

    return surroundingCordinates.forEach((currentCordinate) => {
      if (this.#isCordinateValid(currentCordinate)) {
        const [nthRow, nthColumn] = currentCordinate;
        const currentBlock = this.board[nthRow][nthColumn];
        const hasShip = currentBlock.ship !== null;

        if (!hasShip) currentBlock.isRevealed = true;
      }
    });
  }
}

export default Gameboard;

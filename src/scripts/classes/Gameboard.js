import Ship from "./Ship";

class Gameboard {
  #generateBoard() {
    const size = 10;
    const board = [];

    for (let i = 0; i < size; i++) {
      // create rows
      board[i] = [];

      for (let j = 0; j < size; j++) {
        // create columns
        board[i][j] = { cordinate: [i, j], isAttacked: false, ship: null };
      }
    }

    return board;
  }

  #board = this.#generateBoard(); // to generate board only once

  #isCordinateValid(cordinate = []) {
    if (!Array.isArray(cordinate)) return false;
    if (cordinate.length < 2 || cordinate.length > 2) return false;

    const boardSize = this.#board.length;
    const [nthRow, nthColumn] = cordinate;

    const isRowInbound = nthRow >= 0 && nthRow < boardSize;
    const isColumnInbound = nthColumn >= 0 && nthColumn < boardSize;

    return isRowInbound && isColumnInbound;
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
    const [nthRow, nthColumn] = cordinate;
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

    const surroundingCordinatesValues = Object.values(surroundingCordinates);

    // check if some cordinates have ship in it
    const isOverlapping = surroundingCordinatesValues.some((cordinate) => {
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

  didAllShipsSank() {
    const board = this.board;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const ship = board[i][j].ship;

        if (ship && ship.health > 0) return false; // still a ship left on the board, no need to check further
      }
    }

    // loop ends means there is no ship available on the board or all ships have sanked
    return true;
  }
}

export default Gameboard;

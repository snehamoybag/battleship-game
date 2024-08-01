import Ship from "./Ship";
import IsEmpty from "./IsEmpty";

class Gameboard {
  #generateBoard() {
    const size = 10;
    const board = [];

    for (let i = 0; i < size; i++) {
      // create rows
      board[i] = [];

      for (let j = 0; j < size; j++) {
        // create columns
        board[i][j] = { isAttacked: false, ship: null };
      }
    }

    return board;
  }

  #board = this.#generateBoard(); // to generate board only once

  #isCordinateValid(boardSize, cordinate = []) {
    const [nthRow, nthColumn] = cordinate;

    const isRowInbound = nthRow >= 0 && nthRow < boardSize;
    const isColumnInbound = nthColumn >= 0 && nthColumn < boardSize;

    return isRowInbound && isColumnInbound;
  }

  #areCordinatesPreOccupied(board, cordinates = []) {
    return cordinates.some(([nthRow, nthColumn]) => {
      return board[nthRow][nthColumn].ship instanceof Ship;
    });
  }

  #areCordinatesOverlapping(board, cordinates = []) {
    return cordinates.some((cordinate) => {
      const isEmpty = new IsEmpty(board, cordinate);

      return isEmpty.check();
    });
  }

  board() {
    return this.#board;
  }

  areCordinatesValid(cordinates = []) {
    const board = this.board();

    return cordinates.every((cordinate) =>
      this.#isCordinateValid(board.length, cordinate),
    );
  }

  areCordinatesFree(cordinates = []) {
    if (!this.areCordinatesValid(cordinates)) return false;

    const board = this.board();

    if (this.#areCordinatesPreOccupied(board, cordinates)) return false;
    if (this.#areCordinatesOverlapping(board, cordinates)) return false;

    return true;
  }

  placeShip(cordinates = []) {
    const board = this.board();
    const ship = new Ship(cordinates.length);

    cordinates.forEach(([nthRow, nthColumn]) => {
      board[nthRow][nthColumn].ship = ship;
    });
  }

  recieveAttack(nthRow, nthColumn) {
    const board = this.board();
    const block = board[nthRow][nthColumn];

    block.isAttacked = true;
    block.ship.hit();
  }

  didAllShipsSank() {
    const board = this.board();

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

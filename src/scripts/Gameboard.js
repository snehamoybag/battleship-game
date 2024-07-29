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

  board() {
    return this.#board;
  }

  placeShip(ship, cordinates = []) {
    const board = this.board();

    cordinates.forEach(([nthRow, nthColumn]) => {
      board[nthRow][nthColumn].ship = ship;
    });
  }

  recieveAttack(nthRow, nthColumn) {
    const board = this.board();
    board[nthRow][nthColumn].isAttacked = true;
  }
}

export default Gameboard;

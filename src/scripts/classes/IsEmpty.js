class IsEmpty {
  constructor(board, cordinate = []) {
    this.board = board;
    this.row = cordinate[0];
    this.column = cordinate[1];
  }

  #isInbound(nthRow, nthColumn) {
    const boardSize = this.board.length;
    const isRowInbound = nthRow >= 0 && nthRow < boardSize;
    const isColumnInbound = nthColumn >= 0 && nthColumn < boardSize;

    return isRowInbound && isColumnInbound;
  }

  #isShipPresent(nthRow, nthColumn) {
    const block = this.board[nthRow][nthColumn];
    return block.ship === true;
  }

  #isCordinateEmpty(nthRow, nthColumn) {
    if (!this.#isInbound(nthRow, nthColumn)) return false;
    if (this.#isShipPresent(nthRow, nthColumn)) return false;

    return true; // empty
  }

  #top() {
    return this.#isCordinateEmpty(this.row - 1, this.column);
  }

  #topRight() {
    return this.#isCordinateEmpty(this.row - 1, this.column + 1);
  }

  #right() {
    return this.#isCordinateEmpty(this.row, this.column + 1);
  }

  #bottomRight() {
    return this.#isCordinateEmpty(this.row + 1, this.column + 1);
  }

  #bottom() {
    return this.#isCordinateEmpty(this.row + 1, this.column);
  }

  #bottomLeft() {
    return this.#isCordinateEmpty(this.row + 1, this.column - 1);
  }

  #left() {
    return this.#isCordinateEmpty(this.row, this.column - 1);
  }

  #topLeft() {
    return this.#isCordinateEmpty(this.row - 1, this.column - 1);
  }

  check() {
    return (
      this.#top() &&
      this.#topRight() &&
      this.#right() &&
      this.#bottomRight() &&
      this.#bottom() &&
      this.#bottomLeft() &&
      this.#left() &&
      this.#topLeft()
    );
  }
}

export default IsEmpty;

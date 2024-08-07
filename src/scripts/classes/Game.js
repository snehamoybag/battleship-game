class Game {
  #hasStarted = false;
  #currentPlayer = null;

  get hasStarted() {
    return this.#hasStarted;
  }

  start() {
    this.#hasStarted = true;
  }

  get currentPlayer() {
    return this.#currentPlayer;
  }

  set currentPlayer(player) {
    this.#currentPlayer = player;
  }
}

export default Game;

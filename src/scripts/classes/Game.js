class Game {
  #hasStarted = false;
  #currentPlayer = null;

  constructor() {
    this.isOVer = false;
  }

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

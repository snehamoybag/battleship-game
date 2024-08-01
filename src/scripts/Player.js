import Gameboard from "./Gameboard";

class Player {
  #gameboard = new Gameboard();

  constructor(name) {
    this.name = name;
  }

  get gameboard() {
    return this.#gameboard;
  }
}

export default Player;

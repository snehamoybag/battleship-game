import Gameboard from "./Gameboard";

class Player {
  #gameboard = new Gameboard();

  constructor(name) {
    this.name = name;
  }

  board = this.#gameboard.board;
  areCordinatesValid = this.#gameboard.areCordinatesValid;
  hasCordinatesFree = this.#gameboard.areCordinatesFree;
  placeShipOnBoard = this.#gameboard.placeShip;
  recieveAttack = this.#gameboard.recieveAttack;
  hasNoShipStanding = this.#gameboard.didAllShipsSank;
}

export default Player;

import Gameboard from "./Gameboard";
import getRandomNumInRange from "../helpers/getRandomNumInRange";

class Player {
  #gameboard = new Gameboard();

  #getRandomCordinates(shipSize) {
    const minNum = 0;
    const maxNum = this.#gameboard.board.length - 1;

    const startingNthRow = getRandomNumInRange(minNum, maxNum);
    const startingNthColumn = getRandomNumInRange(minNum, maxNum);
    const shipOrientation = Math.random() <= 0.5 ? "horizontal" : "vertical";

    const randomCordinates = [];

    // fillup with cordinates
    for (let i = 0; i < shipSize; i++) {
      if (shipOrientation === "horizontal") {
        randomCordinates[i] = [startingNthRow, startingNthColumn + i]; // left to right
      } else if (shipOrientation === "vertical") {
        randomCordinates[i] = [startingNthRow + i, startingNthColumn]; // top to bottom
      }
    }

    return randomCordinates;
  }

  // get a random occupiable cordinates to place a ship on the board
  #getRandomFreeCordinates(shipSize = 1) {
    let randdomFreeCordinates = this.#getRandomCordinates(shipSize);

    while (!this.#gameboard.areCordinatesFree(randdomFreeCordinates)) {
      randdomFreeCordinates = this.#getRandomCordinates(shipSize);
    }

    return randdomFreeCordinates;
  }

  #placeShipsRandomly() {
    // place 10 ships randomly on the baord
    const shipSizeAndQuantity = [
      [4, 1],
      [3, 2],
      [2, 3],
      [1, 4],
    ]; // [size, quantity]

    shipSizeAndQuantity.forEach(([size, quantity]) => {
      for (let i = quantity; i > 0; i--) {
        const cordinates = this.#getRandomFreeCordinates(size);
        this.#gameboard.placeShip(cordinates);
      }
    });
  }

  #getBoardWithShips() {
    this.#placeShipsRandomly();

    return this.#gameboard.board;
  }

  #board = this.#getBoardWithShips();

  constructor(name) {
    this.name = name;
  }

  get board() {
    return this.#board;
  }

  placeShipsRandomly() {
    // remove previous ships
    this.#gameboard.removeAllShips();
    this.#placeShipsRandomly();
  }

  recieveAttack(nthRow, nthColumn) {
    this.#gameboard.recieveAttack(nthRow, nthColumn);
  }

  get numberOfShipsLeft() {
    const shipsLeft = new Set();
    const board = this.board;

    board.forEach((row) =>
      row.forEach((column) => {
        const ship = column.ship;
        if (ship && ship.health > 0) shipsLeft.add(ship);
      }),
    );

    return shipsLeft.size;
  }
}

export default Player;

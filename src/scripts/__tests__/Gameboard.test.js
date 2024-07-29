import { describe, test, expect } from "@jest/globals";
import Gameboard from "../Gameboard";
import Ship from "../Ship";

const gameboad = new Gameboard();
const board = gameboad.board();
const cordinates = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];

describe("board() generateion", () => {
  test("board() has 10 rows", () => {
    const numOfRows = board.length;

    expect(numOfRows).toBe(10);
  });

  test("each row has 10 columns", () => {
    board.forEach((row) => {
      const numOfColumns = row.length;

      expect(numOfColumns).toBe(10);
    });
  });
});

describe("placeShip()", () => {
  test("placeShip() places the ship on the given cordinates", () => {
    const ship = new Ship(cordinates.length);

    gameboad.placeShip(ship, cordinates);

    const areShipsPlacedOnCordinates = cordinates.every((cordinate) => {
      const [nthRow, nthColumn] = cordinate;
      return (board[nthRow][nthColumn].ship = ship);
    });

    expect(areShipsPlacedOnCordinates).toBe(true);
  });
});

describe("recieveAttack()", () => {
  test("attacks a given cordinate", () => {
    const [nthRow, nthColumn] = cordinates[0];
    gameboad.recieveAttack(nthRow, nthColumn);

    expect(board[nthRow][nthColumn].isAttacked).toBe(true);
  });
});

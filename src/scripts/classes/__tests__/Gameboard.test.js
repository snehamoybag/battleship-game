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

describe("areCordinatesValid()", () => {
  test("returns true if all cordinates are valid, false otherwise", () => {
    const validCordinates = cordinates;
    const invalidCordinates = [
      [-1, 0],
      [1, 10],
      [-1, 11],
    ];
    const validAndInvalidCordinates = [
      [1, 9],
      [0, -2],
      [4, 4],
      [9, 9],
      [-1, -1],
      [10, 10],
    ];

    expect(gameboad.areCordinatesValid(validCordinates)).toBe(true);
    expect(gameboad.areCordinatesValid(invalidCordinates)).toBe(false);
    expect(gameboad.areCordinatesValid(validAndInvalidCordinates)).toBe(false);
  });
});

describe("placeShip()", () => {
  test("placeShip() creates and places the ship on the given cordinates", () => {
    gameboad.placeShip(cordinates);

    const areShipsPlacedOnCordinates = cordinates.every((cordinate) => {
      const [nthRow, nthColumn] = cordinate;
      const shipOnCordinate = board[nthRow][nthColumn].ship;

      return shipOnCordinate instanceof Ship;
    });

    expect(areShipsPlacedOnCordinates).toBe(true);
  });
});

describe("areCordinatesFree()", () => {
  const preOccupiedCordinates = cordinates; // we have placed ships on earlier test
  const nonOccupiedCordinates = [
    [9, 0],
    [9, 1],
    [9, 2],
    [9, 3],
  ];
  const overlappingCordinates = [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
  ];

  test("returns true if no ship is present on the given cordinates. false otherwise", () => {
    expect(gameboad.areCordinatesFree(nonOccupiedCordinates)).toBe(true);
    expect(gameboad.areCordinatesFree(preOccupiedCordinates)).toBe(false);
  });

  test("returns false if given cordinatates overlaps any placed ship. true otherwise", () => {
    expect(gameboad.areCordinatesFree(overlappingCordinates)).toBe(false);
  });
});

describe("recieveAttack()", () => {
  test("attacks a given cordinate", () => {
    const [nthRow, nthColumn] = cordinates[0];
    gameboad.recieveAttack(nthRow, nthColumn);

    expect(board[nthRow][nthColumn].isAttacked).toBe(true);
  });

  test("deals damage to the ship present on the given cordinates", () => {
    const [nthRow, nthColumn] = cordinates[1];
    const shipOnCordinate = board[nthRow][nthColumn].ship;

    // check if ship actally is present
    expect(shipOnCordinate instanceof Ship).toBe(true);

    const prevHealth = shipOnCordinate.health;
    gameboad.recieveAttack(nthRow, nthColumn);
    const currentHealth = shipOnCordinate.health;

    expect(currentHealth).toBe(prevHealth - 1);
  });
});

describe("didAllShipsSank()", () => {
  test("returns true if there are no ships left on the board or all ships has sanked, false otherwise", () => {
    const freshGameboard = new Gameboard();

    expect(freshGameboard.didAllShipsSank()).toBe(true); // fresh board have no ships on it

    freshGameboard.placeShip(cordinates);

    expect(freshGameboard.didAllShipsSank()).toBe(false);

    // attack and sink the the ship
    cordinates.forEach(([nthRow, nthColumn]) => {
      freshGameboard.recieveAttack(nthRow, nthColumn);
    });

    expect(freshGameboard.didAllShipsSank()).toBe(true);
  });
});

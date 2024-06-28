import { describe, test, expect } from "@jest/globals";
import Board, { generateShipCords, getBoardBlocks } from "../Board";
import Block from "../Block";
import Ship from "../Ship";

describe("board generation", () => {
  const boardBody = new Board().body;

  test("board is an array", () => {
    expect(Array.isArray(boardBody)).toBe(true);
  });

  test("board has 10 rows/arrays in it", () => {
    expect(boardBody.length).toBe(10);
  });
});

describe("each row in a board has 10 blocks in it", () => {
  const boardBody = new Board().body;

  boardBody.forEach((row) => {
    test("row length is 10", () => expect(row.length).toBe(10));

    test("each item is a block", () => {
      expect(row.every((item) => item instanceof Block)).toBe(true);
    });
  });
});

/* TODO */
// test areCordsOccupiable method
// describe("areCordsOccupiable method", () => {})

describe("placeShip method", () => {
  const board = new Board();

  test("places ship on the given cordinates", () => {
    const shipSize = 4;
    const ship = new Ship(shipSize);

    const cords = generateShipCords(0, 0, shipSize, "horizontal");
    board.placeShip(ship, cords);

    const occupiedBlocks = getBoardBlocks(board.body, cords);
    const isShipPlaced = occupiedBlocks.every((block) =>
      Object.is(block.ship, ship),
    );

    expect(isShipPlaced).toBe(true);
  });
});

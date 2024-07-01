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

describe("areCordsOccuipiable method", () => {
  const board = new Board();
  const [startRowIndex, startBlockIndex] = [1, 1];

  test("returns true if there are no ship present within one block raduis from the cords", () => {
    const shipSize = 4;
    const cords = generateShipCords(
      startRowIndex,
      startBlockIndex,
      shipSize,
      "horizontal",
    );

    expect(board.areCordsOccupiable(cords)).toBe(true);

    board.placeShip(new Ship(shipSize), cords); // ship is placed for below test
  });

  test("returns false if there are ships within one block raduis from the cords", () => {
    const shipSize = 3;
    const cords0 = generateShipCords(
      startRowIndex,
      startBlockIndex,
      shipSize,
      "horizontal",
    );
    const cords1 = generateShipCords(
      startRowIndex + 1,
      startBlockIndex,
      shipSize,
      "horizontal",
    );
    const cords2 = generateShipCords(
      startRowIndex,
      startBlockIndex + 1,
      shipSize,
      "horizontal",
    );

    expect(board.areCordsOccupiable(cords0)).toBe(false);
    expect(board.areCordsOccupiable(cords1)).toBe(false);
    expect(board.areCordsOccupiable(cords2)).toBe(false);
  });
});

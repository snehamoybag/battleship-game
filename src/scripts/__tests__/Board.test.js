import { describe, test, expect } from "@jest/globals";
import Board from "../Board";
import Block from "../Block";

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

describe("ships on the board", () => {
  const board = new Board();
  const body = board.body;

  test("has 10 ships", () => {
    const shipsOnBoard = new Set();

    body.forEach((row) =>
      row.forEach((block) => {
        if (block.ship) shipsOnBoard.add(block.ship);
      }),
    );

    expect(shipsOnBoard.size).toBe(10);
  });
});

describe("attack method", () => {
  const board = new Board();

  test("marks a block as attacked", () => {
    const rowIndex = 0;
    const blockIndex = 0;
    const block = board.body[rowIndex][blockIndex];

    expect(block.isAttacked).toBe(false); // before attack

    board.attack(rowIndex, blockIndex);

    expect(block.isAttacked).toBe(true); // after attack
  });

  test("decrements a ships health by 1", () => {
    let cordWithShipOnIt = [];
    let ship = null;

    for (let i = 0; i < board.body.length; i++) {
      const row = board.body[i];

      for (let j = 0; j < row.length; j++) {
        const block = board.body[i][j];
        if (block.ship) {
          cordWithShipOnIt = [i, j];
          ship = block.ship;
        }
      }
    }

    const shipPrevHealth = ship.health;
    board.attack(...cordWithShipOnIt); // attack the ship

    expect(ship.health).toBe(shipPrevHealth - 1);
  });
});

describe("numberOfAvailableShips", () => {
  const board = new Board();

  test("returns the number of ships currently present on the board", () => {
    expect(board.numberOfAvailableShips).toBe(10); // before no ship is sunk
  });
});

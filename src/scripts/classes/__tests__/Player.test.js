import { describe, test, expect } from "@jest/globals";
import Player from "../Player";

describe("board getter", () => {
  test("player board comes with 10 ships preplaced in it", () => {
    const player = new Player("test");
    const playerBoard = player.board;

    const placedShips = new Set();

    playerBoard.forEach((row) =>
      row.forEach((column) => {
        const ship = column.ship;

        if (ship) placedShips.add(ship);
      }),
    );

    expect(placedShips.size).toBe(10);
  });
});

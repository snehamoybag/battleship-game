import { describe, test, expect } from "@jest/globals";
import Ship from "../Ship";

describe("ship methods works", () => {
  test("generates a ship of correct size", () => {
    expect(new Ship(4).size).toBe(4);
    expect(new Ship(3).size).toBe(3);
    expect(new Ship(2).size).toBe(2);
    expect(new Ship(1).size).toBe(1);
  });

  test("throws error if ship size is less than 1 or greater than 4", () => {
    expect(() => new Ship(0)).toThrow();
    expect(() => new Ship(-1)).toThrow();
    expect(() => new Ship(5)).toThrow();
  });

  test("sets health correctly", () => {
    const size = 4;
    expect(new Ship(size).health).toBe(size); // default health is equal to its size
  });

  test("getHit() decreases ship's health by 1", () => {
    const ship = new Ship(4);
    const prevHealth = ship.health;

    ship.getHit();

    expect(ship.health).toBe(prevHealth - 1);
  });

  test("ship is sunk when its health gets to 0", () => {
    const ship = new Ship(1);
    ship.getHit();

    expect(ship.health).toBe(0);
  });
});

import { describe, test, expect } from "@jest/globals";
import Ship from "../Ship";

const size = 4;
const ship = new Ship(4);

test("initially health() returns the size of the ship", () => {
  expect(ship.health).toBe(size);
});

test("hit() decrements the health of a ship by 1", () => {
  const initialHealth = ship.health;

  ship.hit();

  expect(ship.health).toBe(initialHealth - 1);
});

test("ship's isSunk() is true when its health is zero", () => {
  expect(ship.isSunk()).toBe(false);

  for (let i = 0; i < size; i++) {
    ship.hit();
  }

  expect(ship.isSunk()).toBe(true);
});

test("if ship has sunked, hit() method can do no further damage / health cannot be lesser than 0", () => {
  ship.hit(); // do an extra hit

  expect(ship.health).toBe(0);
});

#TODO

## Board class

- board should return a 2 dimensional array that resembels a 10x10 board ✅
- areCordsOccupiable(cords) should return a boolean if ship can be placed legally ✅
- placeShip(ship, cords) should place the ship on to the board ✅
- attack(nthRow, nthBlock) should take the cordinate block.
  if a ship present in the block, deal damage to it.
  ignore, if the block already attacked. (allow the player to take another block). ✅
- availableShips method should return an array of how many ships are still present on the ship ✅

## Ship class

- ship.size() should return the size of the ship. ✅
- ship.health() should return the current health of the ship.
  default health should be equal to its size. ✅
- ship.getHit() should reduce ship's health by 1 ✅
- ship.isSunk() should return a boolean. ship is sunk when its health is zero. ✅

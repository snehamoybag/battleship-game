#TODO

## Board class

- board should return a 2 dimensional array that resembels a 10x10 board ✅
- placeShip(ship, shipSize, startCords, orientation) should place the ship on to the board,
  throw error if ship is out of bound/illegal to place on the given startBlock
- attackShip(block) should take the block.
  if a ship present in the block, deal damage to it.
  ignore, if the block already discovered. (allow the player to take another block)
- availableShips() should return an array of how many ships are still present on the ship

## Ship class

- ship.size() should return the size of the ship. ✅
- ship.health() should return the current health of the ship.
  default health should be equal to its size. ✅
- ship.getHit() should reduce ship's health by 1 ✅
- ship.isSunk() should return a boolean. ship is sunk when its health is zero. ✅

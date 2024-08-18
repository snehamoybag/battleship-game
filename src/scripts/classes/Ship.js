class Ship {
  #occupiedCordinates = [];

  constructor(size = 1) {
    this.size = size;
    this.health = size;
  }

  get occupiedCordinates() {
    return this.#occupiedCordinates;
  }

  set occupiedCordinates(cordinates) {
    this.#occupiedCordinates = cordinates;
  }

  hit() {
    if (this.health > 0) {
      this.health -= 1;
    }
  }

  isSunk() {
    return this.health === 0;
  }
}

export default Ship;

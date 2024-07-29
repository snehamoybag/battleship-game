class Ship {
  constructor(size = 1) {
    this.size = size;
    this.health = size;
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

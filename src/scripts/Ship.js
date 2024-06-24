class Ship {
  #validateSize(size) {
    if (size < 1) throw new Error("size of a ship cannot be less than 1");
    if (size > 4) throw new Error("size of a ship cannot be greater than 4");

    return size;
  }

  #health = null;

  constructor(size = 1) {
    // make this.size not modifiable
    Object.defineProperty(this, "size", {
      enumerable: true,
      writable: false,
      value: this.#validateSize(size),
    });
  }

  get health() {
    if (this.#health === null) this.#health = this.size;
    return this.#health;
  }

  get isSunk() {
    return this.health === 0;
  }

  getHit() {
    const currentHealth = this.health; // using getter to get the latest health
    this.#health = currentHealth - 1;
  }
}

export default Ship;

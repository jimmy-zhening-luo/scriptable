abstract class Bounds {

  isBounded(value: number): boolean {
    return !Number.isNaN(value);
  }

}

module.exports = Bounds;

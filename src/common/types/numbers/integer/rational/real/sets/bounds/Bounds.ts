abstract class Bounds {
  isBounded(value: number): boolean {
    try {
      return !Number.isNaN(value);
    } catch (e) {
      throw new ReferenceError("Bounds: error calling isBounded");
    }
  }
}

module.exports = Bounds;

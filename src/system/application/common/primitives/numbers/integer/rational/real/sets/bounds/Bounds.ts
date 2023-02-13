abstract class Bounds {
  isBounded(
    value: undefined | null | number
  ): boolean {
    return value !== undefined
      && value !== null
      && !Number.isNaN(value);
  }
}

module.exports = Bounds;

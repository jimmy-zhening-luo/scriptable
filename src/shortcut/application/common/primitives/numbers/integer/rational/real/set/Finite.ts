const f_Bounds: typeof Bounds = importModule("bounds/Bounds");

class Finite extends f_Bounds {
  override isBounded(
    value: undefined | null | number
  ): boolean {
    return super.isBounded(value)
      && value !== Infinity
      && value !== -Infinity;
  }
}

module.exports = Finite;

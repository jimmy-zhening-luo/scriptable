const fr_Integer: typeof Integer = importModule("integer/Integer");

class FiniteRational extends fr_Integer.Rational {
  override bounds: Bounds = new FiniteRational.Bounds.Finite();

  static get Integer(): typeof Integer {
    try {
      return fr_Integer;
    } catch (e) {
      throw new ReferenceError(
        `FiniteRational: error loading parent Integer module: \n${e}`,
      );
    }
  }

  static get Rational(): typeof Rational {
    try {
      return FiniteRational.Integer.Rational;
    } catch (e) {
      throw new ReferenceError(
        `FiniteRational: error loading Integer.Rational module: \n${e}`,
      );
    }
  }
}

module.exports = FiniteRational;

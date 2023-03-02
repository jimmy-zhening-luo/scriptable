const fr_Integer: typeof Integer = importModule("integer/Integer");

class FiniteRational extends fr_Integer.Rational {
  override bounds: Bounds = new FiniteRational.Bounds.Finite();

  static get Integer(): typeof Integer {
    return fr_Integer;
  }

  static get Rational(): typeof Rational {
    return FiniteRational.Integer.Rational;
  }
}

module.exports = FiniteRational;

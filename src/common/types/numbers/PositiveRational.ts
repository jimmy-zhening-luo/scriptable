const pr_Integer: typeof Integer = importModule("integer/Integer");

class PositiveRational extends pr_Integer.Rational {
  override cardinality: Cardinality =
    new PositiveRational.Cardinality.Positive();

  static get Integer(): typeof Integer {
    return pr_Integer;
  }

  static get Rational(): typeof Rational {
    return PositiveRational.Integer.Rational;
  }
}

module.exports = PositiveRational;

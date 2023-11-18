const pr_Integer: typeof Integer = importModule(
  "integer/Integer",
) as typeof Integer;

class PositiveRational extends pr_Integer.Rational {
  protected override cardinality: Cardinality
    = new PositiveRational.Cardinality.Positive();

  static get Integer(): typeof Integer {
    try {
      return pr_Integer;
    }
    catch (e) {
      throw new ReferenceError(
        `PositiveRational: error loading parent Integer module: \n${e}`,
      );
    }
  }

  static get Rational(): typeof Rational {
    try {
      return PositiveRational.Integer.Rational;
    }
    catch (e) {
      throw new ReferenceError(
        `PositiveRational: error loading Integer.Rational module: \n${e}`,
      );
    }
  }
}

module.exports = PositiveRational;

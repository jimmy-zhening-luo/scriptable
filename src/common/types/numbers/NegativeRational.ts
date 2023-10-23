const nr_Integer: typeof Integer = importModule(
  "integer/Integer",
) as typeof Integer;

class NegativeRational extends nr_Integer.Rational {
  protected override cardinality: Cardinality =
    new NegativeRational.Cardinality.Negative();

  static get Integer(): typeof Integer {
    try {
      return nr_Integer;
    } catch (e) {
      throw new ReferenceError(
        `NegativeRational: error loading parent Integer module: \n${e}`,
      );
    }
  }

  static get Rational(): typeof Rational {
    try {
      return NegativeRational.Integer.Rational;
    } catch (e) {
      throw new ReferenceError(
        `NegativeRational: error loading Integer.Rational module: \n${e}`,
      );
    }
  }
}

module.exports = NegativeRational;

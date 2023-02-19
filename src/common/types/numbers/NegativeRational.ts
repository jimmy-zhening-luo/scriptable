const nr_Integer: typeof Integer = importModule("integer/Integer");

class NegativeRational extends (nr_Integer.Rational) {

  override cardinality: Cardinality = new NegativeRational.Cardinality.Negative();

  static get Integer(): typeof Integer {
    return nr_Integer;
  }

  static get Rational(): typeof Rational {
    return NegativeRational.Integer.Rational;
  }

}

module.exports = NegativeRational;

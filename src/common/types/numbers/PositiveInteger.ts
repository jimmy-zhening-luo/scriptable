const p_Integer: typeof Integer = importModule("integer/Integer");

class PositiveInteger extends p_Integer {

  constructor(value: number | Rational) {
    super(
      value,
      new PositiveInteger.Positive()
    );
  }

  static get Integer(): typeof Integer {
    return p_Integer;
  }

  static get Positive(): typeof Positive {
    return PositiveInteger.Integer.Cardinality.Positive;
  }

}

module.exports = PositiveInteger;

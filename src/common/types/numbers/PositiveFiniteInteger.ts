const pf_Integer: typeof Integer = importModule("integer/Integer");

class PositiveFiniteInteger extends pf_Integer {

  constructor(value: number | Rational) {
    super(
      value,
      new PositiveFiniteInteger.Positive(),
      new PositiveFiniteInteger.Finite()
    );
  }

  static get Integer(): typeof Integer {
    return pf_Integer;
  }

  static get Positive(): typeof Positive {
    return PositiveFiniteInteger.Integer.Cardinality.Positive;
  }

  static get Finite(): typeof Finite {
    return PositiveFiniteInteger.Integer.Bounds.Finite;
  }

}

module.exports = PositiveFiniteInteger;

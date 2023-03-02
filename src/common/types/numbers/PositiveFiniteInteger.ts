const p_FiniteInteger: typeof FiniteInteger = importModule("FiniteInteger");

class PositiveFiniteInteger extends p_FiniteInteger {
  override cardinality: Cardinality =
    new PositiveFiniteInteger.Cardinality.Positive();

  static get FiniteInteger(): typeof FiniteInteger {
    return p_FiniteInteger;
  }
}

module.exports = PositiveFiniteInteger;

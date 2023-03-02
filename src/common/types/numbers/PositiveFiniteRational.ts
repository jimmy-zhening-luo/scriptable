const p_FiniteRational: typeof FiniteRational = importModule("FiniteRational");

class PositiveFiniteRational extends p_FiniteRational {
  override cardinality: Cardinality =
    new PositiveFiniteRational.Cardinality.Positive();

  static get FiniteRational(): typeof FiniteRational {
    return p_FiniteRational;
  }
}

module.exports = PositiveFiniteRational;

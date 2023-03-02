const n_FiniteRational: typeof FiniteRational = importModule("FiniteRational");

class NegativeFiniteRational extends n_FiniteRational {
  override cardinality: Cardinality =
    new NegativeFiniteRational.Cardinality.Negative();

  static get FiniteRational(): typeof FiniteRational {
    return n_FiniteRational;
  }
}

module.exports = NegativeFiniteRational;

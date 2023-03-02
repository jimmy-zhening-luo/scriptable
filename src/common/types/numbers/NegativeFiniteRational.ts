const n_FiniteRational: typeof FiniteRational = importModule("FiniteRational");

class NegativeFiniteRational extends n_FiniteRational {
  override cardinality: Cardinality =
    new NegativeFiniteRational.Cardinality.Negative();

  static get FiniteRational(): typeof FiniteRational {
    try {
      return n_FiniteRational;
    } catch (e) {
      throw new ReferenceError(
        `NegativeFiniteRational: error loading parent FiniteRational module: ${e}`,
      );
    }
  }
}

module.exports = NegativeFiniteRational;

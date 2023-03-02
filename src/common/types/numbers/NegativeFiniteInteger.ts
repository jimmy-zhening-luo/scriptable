const n_FiniteInteger: typeof FiniteInteger = importModule("FiniteInteger");

class NegativeFiniteInteger extends n_FiniteInteger {
  override cardinality: Cardinality =
    new NegativeFiniteInteger.Cardinality.Negative();

  static get FiniteInteger(): typeof FiniteInteger {
    try {
      return n_FiniteInteger;
    } catch (e) {
      throw new ReferenceError(
        `NegativeFiniteInteger: error loading parent FiniteInteger module: ${e}`,
      );
    }
  }
}

module.exports = NegativeFiniteInteger;

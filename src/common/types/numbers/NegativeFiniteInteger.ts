const n_FiniteInteger: typeof FiniteInteger = importModule("FiniteInteger");

class NegativeFiniteInteger extends n_FiniteInteger {

  override cardinality: Cardinality = new NegativeFiniteInteger.Cardinality.Negative();

  static get FiniteInteger(): typeof FiniteInteger {
    return n_FiniteInteger;
  }

}

module.exports = NegativeFiniteInteger;

const n_FiniteInteger: typeof FiniteInteger = importModule(
  "FiniteInteger",
) as typeof FiniteInteger;

class NegativeFiniteInteger extends n_FiniteInteger {
  protected override cardinality: Cardinality
    = new NegativeFiniteInteger.Cardinality.Negative();

  public static get FiniteInteger(): typeof FiniteInteger {
    try {
      return n_FiniteInteger;
    }
    catch (e) {
      throw new ReferenceError(
        `NegativeFiniteInteger: error loading parent FiniteInteger module: \n${e as string}`,
      );
    }
  }
}

module.exports = NegativeFiniteInteger;

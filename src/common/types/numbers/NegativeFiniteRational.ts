const n_FiniteRational: typeof FiniteRational = importModule(
  "FiniteRational",
) as typeof FiniteRational;

class NegativeFiniteRational extends n_FiniteRational {
  protected override cardinality: Cardinality
    = new NegativeFiniteRational.Cardinality.Negative();

  public static get FiniteRational(): typeof FiniteRational {
    try {
      return n_FiniteRational;
    }
    catch (e) {
      throw new ReferenceError(
        `NegativeFiniteRational: error loading parent FiniteRational module: \n${e as string}`,
      );
    }
  }
}

module.exports = NegativeFiniteRational;

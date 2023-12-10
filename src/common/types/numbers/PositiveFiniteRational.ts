const p_FiniteRational: typeof FiniteRational = importModule(
  "FiniteRational",
) as typeof FiniteRational;

class PositiveFiniteRational extends p_FiniteRational {
  protected override cardinality: Cardinality
    = new PositiveFiniteRational.Cardinality.Positive();

  public static get FiniteRational(): typeof FiniteRational {
    try {
      return p_FiniteRational;
    }
    catch (e) {
      throw new ReferenceError(
        `PositiveFiniteRational: error loading parent FiniteRational module: \n${e as string}`,
      );
    }
  }
}

module.exports = PositiveFiniteRational;

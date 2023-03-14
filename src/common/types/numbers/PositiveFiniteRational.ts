const p_FiniteRational: typeof FiniteRational = importModule("FiniteRational");

class PositiveFiniteRational extends p_FiniteRational {
  protected override cardinality: Cardinality =
    new PositiveFiniteRational.Cardinality.Positive();

  static get FiniteRational(): typeof FiniteRational {
    try {
      return p_FiniteRational;
    } catch (e) {
      throw new ReferenceError(
        `PositiveFiniteRational: error loading parent FiniteRational module: \n${e}`,
      );
    }
  }
}

module.exports = PositiveFiniteRational;

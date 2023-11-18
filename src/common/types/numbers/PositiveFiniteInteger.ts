const p_FiniteInteger: typeof FiniteInteger = importModule(
  "FiniteInteger",
) as typeof FiniteInteger;

class PositiveFiniteInteger extends p_FiniteInteger {
  protected override cardinality: Cardinality
    = new PositiveFiniteInteger.Cardinality.Positive();

  static get FiniteInteger(): typeof FiniteInteger {
    try {
      return p_FiniteInteger;
    }
    catch (e) {
      throw new ReferenceError(
        `PositiveFiniteInteger: error loading parent FiniteInteger module: \n${e}`,
      );
    }
  }
}

module.exports = PositiveFiniteInteger;

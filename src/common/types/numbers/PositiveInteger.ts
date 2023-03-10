const p_Integer: typeof Integer = importModule("integer/Integer");

class PositiveInteger extends p_Integer {
  override cardinality: Cardinality =
    new PositiveInteger.Cardinality.Positive();

  static get Integer(): typeof Integer {
    try {
      return p_Integer;
    } catch (e) {
      throw new ReferenceError(
        `PositiveInteger: error loading parent Integer module: \n${e}`,
      );
    }
  }
}

module.exports = PositiveInteger;

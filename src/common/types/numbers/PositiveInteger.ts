const p_Integer: typeof Integer = importModule(
  "integer/Integer",
) as typeof Integer;

class PositiveInteger extends p_Integer {
  protected override cardinality: Cardinality
    = new PositiveInteger.Cardinality.Positive();

  public static get Integer(): typeof Integer {
    try {
      return p_Integer;
    }
    catch (e) {
      throw new ReferenceError(
        `PositiveInteger: error loading parent Integer module: \n${e as string}`,
      );
    }
  }
}

module.exports = PositiveInteger;

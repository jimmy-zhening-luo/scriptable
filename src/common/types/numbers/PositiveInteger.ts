const p_Integer: typeof Integer = importModule("integer/Integer");

class PositiveInteger extends p_Integer {

  override cardinality: Cardinality = new PositiveInteger.Cardinality.Positive();

  static get Integer(): typeof Integer {
    return p_Integer;
  }

}

module.exports = PositiveInteger;

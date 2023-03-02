const n_Integer: typeof Integer = importModule("integer/Integer");

class NegativeInteger extends n_Integer {
  override cardinality: Cardinality =
    new NegativeInteger.Cardinality.Negative();

  static get Integer(): typeof Integer {
    return n_Integer;
  }
}

module.exports = NegativeInteger;

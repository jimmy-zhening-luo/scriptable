const n_Integer: typeof Integer = importModule("integer/Integer");

class NegativeInteger extends n_Integer {
  override cardinality: Cardinality =
    new NegativeInteger.Cardinality.Negative();

  static get Integer(): typeof Integer {
    try {
      return n_Integer;
    } catch (e) {
      throw new ReferenceError(
        `NegativeInteger: error loading parent Integer module: \n${e}`,
      );
    }
  }
}

module.exports = NegativeInteger;

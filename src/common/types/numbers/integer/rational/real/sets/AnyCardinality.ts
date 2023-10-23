const a_Cardinality: typeof Cardinality = importModule(
  "cardinality/Cardinality",
) as typeof Cardinality;

class AnyCardinality extends a_Cardinality {
  static get Cardinality(): typeof Cardinality {
    try {
      return a_Cardinality;
    } catch (e) {
      throw new ReferenceError(
        "AnyCardinality: error importing Cardinality module",
      );
    }
  }
}

module.exports = AnyCardinality;

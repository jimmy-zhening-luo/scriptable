const a_Cardinality: typeof Cardinality = importModule(
  "cardinality/Cardinality",
);

class AnyCardinality extends a_Cardinality {
  static get Cardinality(): typeof Cardinality {
    return a_Cardinality;
  }
}

module.exports = AnyCardinality;

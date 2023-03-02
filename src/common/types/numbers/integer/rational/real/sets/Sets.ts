class Sets {
  static get Base(): {
    Bounds: typeof Bounds;
    Cardinality: typeof Cardinality;
  } {
    return {
      Bounds: importModule("bounds/Bounds"),
      Cardinality: importModule("cardinality/Cardinality"),
    };
  }

  static get Bounds(): {
    Finite: typeof Finite;
    Infinite: typeof Infinite;
  } {
    return {
      Finite: importModule("Finite"),
      Infinite: importModule("Infinite"),
    };
  }

  static get Cardinality(): {
    AnyCardinality: typeof AnyCardinality;
    Positive: typeof Positive;
    Negative: typeof Negative;
  } {
    return {
      AnyCardinality: importModule("AnyCardinality"),
      Positive: importModule("Positive"),
      Negative: importModule("Negative"),
    };
  }
}

module.exports = Sets;

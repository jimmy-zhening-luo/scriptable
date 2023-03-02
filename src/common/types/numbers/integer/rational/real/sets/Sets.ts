class Sets {
  static get Base(): {
    Bounds: typeof Bounds;
    Cardinality: typeof Cardinality;
  } {
    try {
      return {
        Bounds: importModule("bounds/Bounds"),
        Cardinality: importModule("cardinality/Cardinality"),
      };
    } catch (e) {
      throw new ReferenceError(
        "Sets: error importing Bounds or Cardinality module",
      );
    }
  }

  static get Bounds(): {
    Finite: typeof Finite;
    Infinite: typeof Infinite;
  } {
    try {
      return {
        Finite: importModule("Finite"),
        Infinite: importModule("Infinite"),
      };
    } catch (e) {
      throw new ReferenceError(
        "Sets: error importing Finite or Infinite module",
      );
    }
  }

  static get Cardinality(): {
    AnyCardinality: typeof AnyCardinality;
    Positive: typeof Positive;
    Negative: typeof Negative;
  } {
    try {
      return {
        AnyCardinality: importModule("AnyCardinality"),
        Positive: importModule("Positive"),
        Negative: importModule("Negative"),
      };
    } catch (e) {
      throw new ReferenceError(
        "Sets: error importing AnyCardinality, Positive, or Negative module",
      );
    }
  }
}

module.exports = Sets;

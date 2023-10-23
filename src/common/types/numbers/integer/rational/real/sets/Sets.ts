class Sets {
  static get Bounds(): {
    Finite: typeof Finite;
    Infinite: typeof Infinite;
  } {
    try {
      return {
        Finite: importModule("Finite") as typeof Finite,
        Infinite: importModule("Infinite") as typeof Infinite,
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
        AnyCardinality: importModule("AnyCardinality") as typeof AnyCardinality,
        Positive: importModule("Positive") as typeof Positive,
        Negative: importModule("Negative") as typeof Negative,
      };
    } catch (e) {
      throw new ReferenceError(
        "Sets: error importing AnyCardinality, Positive, or Negative module",
      );
    }
  }

  static get Base(): {
    Bounds: typeof Bounds;
    Cardinality: typeof Cardinality;
  } {
    try {
      return {
        Bounds: Sets.Bounds.Infinite.Bounds,
        Cardinality: Sets.Cardinality.AnyCardinality.Cardinality,
      };
    } catch (e) {
      throw new ReferenceError(
        "Sets: error importing Bounds or Cardinality module",
      );
    }
  }
}

module.exports = Sets;

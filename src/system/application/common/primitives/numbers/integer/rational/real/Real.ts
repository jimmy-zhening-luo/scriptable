abstract class Real {
  readonly bounds: Bounds;
  readonly cardinality: Cardinality;
  constructor(
    cardinality: Cardinality = new Real.AnyCardinality(),
    bounds: Bounds = new Real.Infinite()
  ) {
    this.cardinality = cardinality;
    this.bounds = bounds;
  }

  abstract get number(): number;
  toNumber(): number {
    return this.number;
  }
  abstract get string(): string;
  toString(): string {
    return this.string;
  }

  static get Sets(): typeof Sets {
    return importModule("sets/Sets");
  }

  static get Bounds(): typeof Sets.Bounds {
    return Real.Sets.Bounds;
  }

  static get Cardinality(): typeof Sets.Cardinality {
    return Real.Sets.Cardinality;
  }

  protected static get Infinite(): typeof Infinite {
    return Real.Bounds.Infinite;
  }

  protected static get AnyCardinality(): typeof AnyCardinality {
    return Real.Cardinality.AnyCardinality;
  }

}

module.exports = Real;

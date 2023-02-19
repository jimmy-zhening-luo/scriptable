abstract class Real {

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

}

module.exports = Real;

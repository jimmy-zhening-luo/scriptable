abstract class Real {
  abstract get number(): number;

  toNumber(): number {
    try {
      return this.number;
    } catch (e) {
      throw new Error("Real: error calling toNumber");
    }
  }

  abstract get stringValue(): string;

  toString(): string {
    try {
      return this.stringValue;
    } catch (e) {
      throw new Error("Real: error calling toString");
    }
  }

  static get Sets(): typeof Sets {
    try {
      return importModule("sets/Sets");
    } catch (e) {
      throw new ReferenceError("Real: error importing Sets module");
    }
  }

  static get Bounds(): typeof Sets.Bounds {
    try {
      return Real.Sets.Bounds;
    } catch (e) {
      throw new ReferenceError("Real: error importing Bounds module");
    }
  }

  static get Cardinality(): typeof Sets.Cardinality {
    try {
      return Real.Sets.Cardinality;
    } catch (e) {
      throw new ReferenceError("Real: error importing Cardinality module");
    }
  }
}

module.exports = Real;

abstract class Real {
  protected abstract readonly _raw: number;

  protected abstract _qualifies(rawNumber: number): boolean;

  get isValid(): boolean {
    try {
      return this._qualifies(this._raw);
    } catch (e) {
      throw new EvalError("Real: error calling isValid");
    }
  }

  get value(): null | number {
    try {
      return this.isValid ? this._raw : null;
    } catch (e) {
      throw new EvalError("Rational: error calling number");
    }
  }

  toNumber(): number {
    try {
      return this.value ?? NaN;
    } catch (e) {
      throw new EvalError("Real: error calling toNumber");
    }
  }

  toString(): string {
    try {
      return this.isValid ? String(this.toNumber()) : "";
    } catch (e) {
      throw new EvalError("Real: error calling toString");
    }
  }

  static get Sets(): typeof Sets {
    try {
      return importModule("sets/Sets") as typeof Sets;
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

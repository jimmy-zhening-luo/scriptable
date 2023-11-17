const r_Real: typeof Real = importModule("real/Real") as typeof Real;

class Rational extends r_Real {
  protected readonly _raw: number;
  protected readonly bounds: Bounds = new Rational.Bounds.Infinite();
  protected readonly cardinality: Cardinality =
    new Rational.Cardinality.AnyCardinality();

  constructor(number: number | string | Rational) {
    super();
    try {
      this._raw =
        typeof number === "string"
          ? number.trim().toLowerCase() === "infinity"
            ? Infinity
            : number.trim().toLowerCase() === "-infinity"
              ? -Infinity
              : number.trim().toLowerCase() === "nan"
                ? NaN
                : number.includes(".")
                  ? Number.parseFloat(number)
                  : Number.parseInt(number)
          : typeof number === "number"
            ? number
            : number.toNumber();
    } catch (e) {
      throw new SyntaxError("Rational: error constructing Rational");
    }
  }

  protected _qualifies(rawNumber: number): boolean {
    try {
      return (
        this.bounds.isBounded(rawNumber) &&
        this.cardinality.isCardinal(rawNumber)
      );
    } catch (e) {
      throw new EvalError("Rational: error calling _qualifies");
    }
  }

  get isNaN(): boolean {
    try {
      return Number.isNaN(this.toNumber());
    } catch (e) {
      throw new EvalError("Rational: error calling isNaN");
    }
  }

  get isZero(): boolean {
    try {
      return this.toNumber() === 0 || this.toNumber() === -0;
    } catch (e) {
      throw new EvalError("Rational: error calling isZero");
    }
  }

  get isNonZero(): boolean {
    try {
      return !this.isNaN && !this.isZero;
    } catch (e) {
      throw new EvalError("Rational: error calling isNonZero");
    }
  }

  get isFinite(): boolean {
    try {
      return Number.isFinite(this.toNumber());
    } catch (e) {
      throw new EvalError("Rational: error calling isFinite");
    }
  }

  get isInfinity(): boolean {
    try {
      return this.isPositiveInfinity || this.isNegativeInfinity;
    } catch (e) {
      throw new EvalError("Rational: error calling isInfinite");
    }
  }

  get isPositiveInfinity(): boolean {
    try {
      return this.toNumber() === Infinity;
    } catch (e) {
      throw new EvalError("Rational: error calling isPositiveInfinite");
    }
  }

  get isNegativeInfinity(): boolean {
    try {
      return this.toNumber() === -Infinity;
    } catch (e) {
      throw new EvalError("Rational: error calling isNegativeInfinite");
    }
  }

  get isStrictlyPositive(): boolean {
    try {
      return this.toNumber() > 0;
    } catch (e) {
      throw new EvalError("Rational: error calling isStrictlyPositive");
    }
  }

  get isStrictlyNegative(): boolean {
    try {
      return this.toNumber() < 0;
    } catch (e) {
      throw new EvalError("Rational: error calling isStrictlyNegative");
    }
  }

  get isPositive(): boolean {
    try {
      return this.isZero || this.isStrictlyPositive;
    } catch (e) {
      throw new EvalError("Rational: error calling isPositive");
    }
  }

  get isNegative(): boolean {
    try {
      return this.isZero || this.isStrictlyNegative;
    } catch (e) {
      throw new EvalError("Rational: error calling isNegative");
    }
  }

  get isFiniteInteger(): boolean {
    try {
      return Number.isSafeInteger(this.toNumber());
    } catch (e) {
      throw new EvalError(
        "Rational: error calling isFiniteInteger using static isSafeInteger",
      );
    }
  }

  get isInteger(): boolean {
    try {
      return this.isFiniteInteger || this.isInfinity;
    } catch (e) {
      throw new EvalError("Rational: error calling isInteger");
    }
  }

  static get Real(): typeof Real {
    try {
      return r_Real;
    } catch (e) {
      throw new ReferenceError("Rational: error importing module Real");
    }
  }
}

module.exports = Rational;

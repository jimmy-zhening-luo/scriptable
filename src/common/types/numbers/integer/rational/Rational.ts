const r_Real: typeof Real = importModule("real/Real") as typeof Real;

class Rational extends r_Real {
  protected readonly _raw: number;
  protected readonly bounds: Bounds = new Rational.Bounds.Infinite();
  protected readonly cardinality: Cardinality
    = new Rational.Cardinality.AnyCardinality();

  constructor(number: number | string | Rational) {
    super();
    try {
      this._raw
        = typeof number === "string"
          ? number.trim()
            .toLowerCase() === "infinity"
            ? Infinity
            : number.trim()
              .toLowerCase() === "-infinity"
              ? -Infinity
              : number.trim()
                .toLowerCase() === "nan"
                ? NaN
                : number.includes(".")
                  ? Number.parseFloat(number)
                  : Number.parseInt(number)
          : typeof number === "number"
            ? number
            : number.toNumber();
    }
    catch (e) {
      throw new SyntaxError("Rational: error constructing Rational");
    }
  }

  public static get Real(): typeof Real {
    try {
      return r_Real;
    }
    catch (e) {
      throw new ReferenceError("Rational: error importing module Real");
    }
  }

  public get isNaN(): boolean {
    try {
      return Number.isNaN(this.toNumber());
    }
    catch (e) {
      throw new EvalError("Rational: error calling isNaN");
    }
  }

  public get isZero(): boolean {
    try {
      return this.toNumber() === 0 || this.toNumber() === -0;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isZero");
    }
  }

  public get isNonZero(): boolean {
    try {
      return !this.isNaN && !this.isZero;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isNonZero");
    }
  }

  public get isFinite(): boolean {
    try {
      return Number.isFinite(this.toNumber());
    }
    catch (e) {
      throw new EvalError("Rational: error calling isFinite");
    }
  }

  public get isInfinity(): boolean {
    try {
      return this.isPositiveInfinity || this.isNegativeInfinity;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isInfinite");
    }
  }

  public get isPositiveInfinity(): boolean {
    try {
      return this.toNumber() === Infinity;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isPositiveInfinite");
    }
  }

  public get isNegativeInfinity(): boolean {
    try {
      return this.toNumber() === -Infinity;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isNegativeInfinite");
    }
  }

  public get isStrictlyPositive(): boolean {
    try {
      return this.toNumber() > 0;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isStrictlyPositive");
    }
  }

  public get isStrictlyNegative(): boolean {
    try {
      return this.toNumber() < 0;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isStrictlyNegative");
    }
  }

  public get isPositive(): boolean {
    try {
      return this.isZero || this.isStrictlyPositive;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isPositive");
    }
  }

  public get isNegative(): boolean {
    try {
      return this.isZero || this.isStrictlyNegative;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isNegative");
    }
  }

  public get isFiniteInteger(): boolean {
    try {
      return Number.isSafeInteger(this.toNumber());
    }
    catch (e) {
      throw new EvalError(
        "Rational: error calling isFiniteInteger using static isSafeInteger",
      );
    }
  }

  public get isInteger(): boolean {
    try {
      return this.isFiniteInteger || this.isInfinity;
    }
    catch (e) {
      throw new EvalError("Rational: error calling isInteger");
    }
  }

  protected _qualifies(rawNumber: number): boolean {
    try {
      return (
        this.bounds.isBounded(rawNumber)
        && this.cardinality.isCardinal(rawNumber)
      );
    }
    catch (e) {
      throw new EvalError("Rational: error calling _qualifies");
    }
  }
}

module.exports = Rational;

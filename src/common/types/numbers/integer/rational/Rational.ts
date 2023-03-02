const _Real: typeof Real = importModule("real/Real");

class Rational extends _Real {
  readonly value: null | number;
  readonly bounds: Bounds = new Rational.Bounds.Infinite();
  readonly cardinality: Cardinality = new Rational.Cardinality.AnyCardinality();

  constructor(value: number | string | Rational) {
    super();
    try {
      value = this.parse(value);
      this.value = this.qualifies(value) ? (value === -0 ? 0 : value) : null;
    } catch (e) {
      throw new Error("Rational: error constructing Rational");
    }
  }

  private parse(value: ConstructorParameters<typeof Rational>[0]): number {
    try {
      if (typeof value === "string") {
        if (value === "Infinity") return Infinity;
        else if (value === "-Infinity") return -Infinity;
        else if (value === "NaN") return NaN;
        else {
          if (value.includes("."))
            return Number.isNaN(Number.parseFloat(value))
              ? NaN
              : Number.parseFloat(value);
          else
            return Number.isNaN(Number.parseInt(value))
              ? NaN
              : Number.parseInt(value);
        }
      } else if (typeof value === "number") return value;
      else if (value instanceof Object) return value.number;
      else return NaN;
    } catch (e) {
      throw new SyntaxError("Rational: error parsing value");
    }
  }

  protected qualifies(value: number): boolean {
    try {
      return this.bounds.isBounded(value) && this.cardinality.isCardinal(value);
    } catch (e) {
      throw new Error("Rational: error calling qualifies");
    }
  }

  get isValidNumber(): boolean {
    try {
      return this.value !== null && !Number.isNaN(this.value);
    } catch (e) {
      throw new Error("Rational: error calling isValidNumber");
    }
  }

  get number(): number {
    try {
      return this.isValidNumber ? this.value! : NaN;
    } catch (e) {
      throw new Error("Rational: error calling number");
    }
  }

  get isNaN(): boolean {
    try {
      return Number.isNaN(this.number);
    } catch (e) {
      throw new Error("Rational: error calling isNaN");
    }
  }

  get isZero(): boolean {
    try {
      return this.number === 0 || this.number === -0;
    } catch (e) {
      throw new Error("Rational: error calling isZero");
    }
  }

  get isFinite(): boolean {
    try {
      return Number.isFinite(this.number);
    } catch (e) {
      throw new Error("Rational: error calling isFinite");
    }
  }

  get isInfinite(): boolean {
    try {
      return this.isPositiveInfinite || this.isNegativeInfinite;
    } catch (e) {
      throw new Error("Rational: error calling isInfinite");
    }
  }

  get isPositiveInfinite(): boolean {
    try {
      return this.number === Infinity;
    } catch (e) {
      throw new Error("Rational: error calling isPositiveInfinite");
    }
  }

  get isNegativeInfinite(): boolean {
    try {
      return this.number === -Infinity;
    } catch (e) {
      throw new Error("Rational: error calling isNegativeInfinite");
    }
  }

  get isStrictlyPositive(): boolean {
    try {
      return this.number > 0;
    } catch (e) {
      throw new Error("Rational: error calling isStrictlyPositive");
    }
  }

  get isStrictlyNegative(): boolean {
    try {
      return this.number < 0;
    } catch (e) {
      throw new Error("Rational: error calling isStrictlyNegative");
    }
  }

  get isPositive(): boolean {
    try {
      return this.isZero || this.isStrictlyPositive;
    } catch (e) {
      throw new Error("Rational: error calling isPositive");
    }
  }

  get isNegative(): boolean {
    try {
      return this.isZero || this.isStrictlyNegative;
    } catch (e) {
      throw new Error("Rational: error calling isNegative");
    }
  }

  get isFiniteInteger(): boolean {
    try {
      return Number.isSafeInteger(this.number);
    } catch (e) {
      throw new Error(
        "Rational: error calling isFiniteInteger using static isSafeInteger",
      );
    }
  }

  get isInteger(): boolean {
    try {
      return this.isFiniteInteger || this.isInfinite;
    } catch (e) {
      throw new Error("Rational: error calling isInteger");
    }
  }

  get stringValue(): string {
    try {
      return this.isValidNumber ? String() : String(this.value);
    } catch (e) {
      throw new Error("Rational: error calling string");
    }
  }

  static isValidNumber(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isValidNumber {
    try {
      return new Rational(value).isValidNumber;
    } catch (e) {
      throw new Error("Rational: error calling static isValidNumber");
    }
  }

  static number(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.number {
    try {
      return new Rational(value).number;
    } catch (e) {
      throw new Error("Rational: error calling static number");
    }
  }

  static isNaN(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isNaN {
    try {
      return new Rational(value).isNaN;
    } catch (e) {
      throw new Error("Rational: error calling static isNaN");
    }
  }

  static isZero(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isZero {
    try {
      return new Rational(value).isZero;
    } catch (e) {
      throw new Error("Rational: error calling static isZero");
    }
  }

  static isFinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isFinite {
    try {
      return new Rational(value).isFinite;
    } catch (e) {
      throw new Error("Rational: error calling static isFinite");
    }
  }

  static isInfinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isInfinite {
    try {
      return new Rational(value).isInfinite;
    } catch (e) {
      throw new Error("Rational: error calling static isInfinite");
    }
  }

  static isPositiveInfinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isPositiveInfinite {
    try {
      return new Rational(value).isPositiveInfinite;
    } catch (e) {
      throw new Error("Rational: error calling static isPositiveInfinite");
    }
  }

  static isNegativeInfinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isNegativeInfinite {
    try {
      return new Rational(value).isNegativeInfinite;
    } catch (e) {
      throw new Error("Rational: error calling static isNegativeInfinite");
    }
  }

  static isStrictlyPositive(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isStrictlyPositive {
    try {
      return new Rational(value).isStrictlyPositive;
    } catch (e) {
      throw new Error("Rational: error calling static isStrictlyPositive");
    }
  }

  static isStrictlyNegative(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isStrictlyNegative {
    try {
      return new Rational(value).isStrictlyNegative;
    } catch (e) {
      throw new Error("Rational: error calling static isStrictlyNegative");
    }
  }

  static isPositive(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isPositive {
    try {
      return new Rational(value).isPositive;
    } catch (e) {
      throw new Error("Rational: error calling static isPositive");
    }
  }

  static isNegative(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isNegative {
    try {
      return new Rational(value).isNegative;
    } catch (e) {
      throw new Error("Rational: error calling static isNegative");
    }
  }

  static isInteger(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isInteger {
    try {
      return new Rational(value).isInteger;
    } catch (e) {
      throw new Error("Rational: error calling static isInteger");
    }
  }

  static isFiniteInteger(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isFiniteInteger {
    try {
      return new Rational(value).isFiniteInteger;
    } catch (e) {
      throw new Error("Rational: error calling static isFiniteInteger");
    }
  }

  static string(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.stringValue {
    try {
      return new Rational(value).stringValue;
    } catch (e) {
      throw new Error("Rational: error calling static string");
    }
  }

  static get Real(): typeof Real {
    try {
      return _Real;
    } catch (e) {
      throw new ReferenceError("Rational: error importing module Real");
    }
  }
}

module.exports = Rational;

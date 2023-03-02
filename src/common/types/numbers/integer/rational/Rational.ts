const _Real: typeof Real = importModule("real/Real");

class Rational extends _Real {
  readonly value: null | number;
  readonly bounds: Bounds = new Rational.Bounds.Infinite();
  readonly cardinality: Cardinality = new Rational.Cardinality.AnyCardinality();

  constructor(value: number | string | Rational) {
    super();
    value = this.parse(value);
    this.value = this.qualifies(value) ? (value === -0 ? 0 : value) : null;
  }

  private parse(value: ConstructorParameters<typeof Rational>[0]): number {
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
  }

  protected qualifies(value: number): boolean {
    return this.bounds.isBounded(value) && this.cardinality.isCardinal(value);
  }

  get isValidNumber(): boolean {
    return this.value !== null && !Number.isNaN(this.value);
  }

  get number(): number {
    return this.isValidNumber ? this.value! : NaN;
  }

  get isNaN(): boolean {
    return Number.isNaN(this.number);
  }

  get isZero(): boolean {
    return this.number === 0 || this.number === -0;
  }

  get isFinite(): boolean {
    return Number.isFinite(this.number);
  }

  get isInfinite(): boolean {
    return this.isPositiveInfinite || this.isNegativeInfinite;
  }

  get isPositiveInfinite(): boolean {
    return this.number === Infinity;
  }

  get isNegativeInfinite(): boolean {
    return this.number === -Infinity;
  }

  get isStrictlyPositive(): boolean {
    return this.number > 0;
  }

  get isStrictlyNegative(): boolean {
    return this.number < 0;
  }

  get isPositive(): boolean {
    return this.isZero || this.isStrictlyPositive;
  }

  get isNegative(): boolean {
    return this.isZero || this.isStrictlyNegative;
  }

  get isFiniteInteger(): boolean {
    return Number.isSafeInteger(this.number);
  }

  get isInteger(): boolean {
    return this.isFiniteInteger || this.isInfinite;
  }

  get string(): string {
    return this.isValidNumber ? String() : String(this.value);
  }

  static isValidNumber(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isValidNumber {
    return new Rational(value).isValidNumber;
  }

  static number(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.number {
    return new Rational(value).number;
  }

  static isNaN(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isNaN {
    return new Rational(value).isNaN;
  }

  static isZero(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isZero {
    return new Rational(value).isZero;
  }

  static isFinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isFinite {
    return new Rational(value).isFinite;
  }

  static isInfinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isInfinite {
    return new Rational(value).isInfinite;
  }

  static isPositiveInfinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isPositiveInfinite {
    return new Rational(value).isPositiveInfinite;
  }

  static isNegativeInfinite(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isNegativeInfinite {
    return new Rational(value).isNegativeInfinite;
  }

  static isStrictlyPositive(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isStrictlyPositive {
    return new Rational(value).isStrictlyPositive;
  }

  static isStrictlyNegative(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isStrictlyNegative {
    return new Rational(value).isStrictlyNegative;
  }

  static isPositive(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isPositive {
    return new Rational(value).isPositive;
  }

  static isNegative(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isNegative {
    return new Rational(value).isNegative;
  }

  static isInteger(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isInteger {
    return new Rational(value).isInteger;
  }

  static isFiniteInteger(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.isFiniteInteger {
    return new Rational(value).isFiniteInteger;
  }

  static string(
    value: ConstructorParameters<typeof Rational>[0],
  ): typeof Rational.prototype.string {
    return new Rational(value).string;
  }

  static get Real(): typeof Real {
    return _Real;
  }
}

module.exports = Rational;

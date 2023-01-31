class Rational extends Real {
  readonly value: number | null;
  constructor(
    value: Rational | number,
    cardinality?: Cardinality,
    bounds?: Bounds
  ) {
    super(cardinality, bounds);
    value = value instanceof Rational ?
      value.number
      : value;
    this.value = this.qualifies(value) ?
      value === -0 ?
        0
        : value
      : null;
  }

  protected qualifies(value: number): boolean {
    return this.bounds.isBounded(value)
      && this.cardinality.isCardinal(value);
  }

  get isNumber(): boolean {
    return !(this.value === null);
  }

  get isFinite(): boolean {
    return Number.isFinite(this.number);
  }

  get isInfinite(): boolean {
    return this.isPositiveInfinite
      || this.isNegativeInfinite;
  }

  get isPositiveInfinite(): boolean {
    return this.number === Infinity;
  }

  get isNegativeInfinite(): boolean {
    return this.number === -Infinity;
  }

  get isZero(): boolean {
    return this.number === 0;
  }

  get isStrictlyPositive(): boolean {
    return this.number > 0;
  }

  get isStrictlyNegative(): boolean {
    return this.number < 0;
  }

  get isPositive(): boolean {
    return this.isZero
      || this.isStrictlyPositive;
  }

  get isNegative(): boolean {
    return this.isZero
      || this.isStrictlyNegative;
  }

  get isInteger(): boolean {
    return Number.isInteger(this.number);
  }

  get string(): string {
    return this.isNumber ?
      String()
      : String(this.value);
  }

  get number(): number {
    return this.isNumber ?
      this.value as number
      : NaN;
  }
}

abstract class Real {
  readonly bounds: Bounds;
  readonly cardinality: Cardinality;
  constructor(
    cardinality: Cardinality = new AnyCardinality(),
    bounds: Bounds = new Infinite()
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
}

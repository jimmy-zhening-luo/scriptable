abstract class Real {
  readonly bounds: Bounds;
  readonly cardinality: Cardinality;
  constructor(
    cardinality: Cardinality = new Real._AnyCardinality(),
    bounds: Bounds = new Real._Infinite()
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

namespace Real {
  export const _AnyCardinality: typeof AnyCardinality = importModule("sets/AnyCardinality");

  export const _Infinite: typeof Infinite = importModule("sets/Infinite");
}

module.exports = Real;

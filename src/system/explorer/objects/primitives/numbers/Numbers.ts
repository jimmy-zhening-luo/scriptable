namespace Numbers {
  export abstract class RealNumber {
    readonly bounds: Bounds;
    readonly cardinality: Cardinality;
    constructor(
      cardinality: Cardinality = new Cardinality.AnyCardinality(),
      bounds: Bounds = new Bounds.InfiniteBounds()
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

  export namespace RealNumber {
    const Bounds = importModule("Bounds");
    const Cardinality = importModule("Cardinality");

    export class Rational extends RealNumber {
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

    export namespace Rational {
      export class PositiveNumber extends Rational {
        constructor(
          value: Rational | number,
          bounds?: Bounds
        ) {
          super(value, new Cardinality.PositiveCardinality(), bounds);
        }
      }

      export class NegativeNumber extends Rational {
        constructor(
          value: Rational | number,
          bounds?: Bounds
        ) {
          super(value, new Cardinality.NegativeCardinality(), bounds);
        }
      }

      export class FiniteNumber extends Rational {
        constructor(
          value: Rational | number,
          cardinality?: Cardinality
        ) {
          super(value, cardinality, new Bounds.FiniteBounds());
        }
      }

      export namespace FiniteNumber {
        export class PositiveFiniteNumber extends FiniteNumber {
          constructor(value: Rational | number) {
            super(value, new Cardinality.PositiveCardinality());
          }
        }

        export class NegativeFiniteNumber extends FiniteNumber {
          constructor(value: Rational | number) {
            super(value, new Cardinality.NegativeCardinality());
          }
        }
      }

      export class Integer extends Rational {
        protected override qualifies(value: number): boolean {
          return super.qualifies(value)
            && Number.isInteger(value);
        }
      }

      export namespace Integer {
        export class PositiveInteger extends Integer {
          constructor(
            value: Rational | number,
            bounds?: Bounds
          ) {
            super(value, new Cardinality.PositiveCardinality(), bounds);
          }
        }

        export class NegativeInteger extends Integer {
          constructor(
            value: Rational | number,
            bounds?: Bounds
          ) {
            super(value, new Cardinality.NegativeCardinality(), bounds);
          }
        }

        export class FiniteInteger extends Integer {
          constructor(
            value: Rational | number,
            cardinality?: Cardinality
          ) {
            super(value, cardinality, new Bounds.FiniteBounds());
          }
        }

        export namespace FiniteInteger {
          export class PositiveFiniteInteger extends FiniteInteger {
            constructor(value: Rational | number) {
              super(value, new Cardinality.PositiveCardinality());
            }
          }

          export class NegativeFiniteInteger extends FiniteInteger {
            constructor(value: Rational | number) {
              super(value, new Cardinality.NegativeCardinality());
            }
          }
        }
      }
    }
  }
}

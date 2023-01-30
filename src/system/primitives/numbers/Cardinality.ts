namespace Primitives {

  /// <reference path="Numbers.ts" />
  export namespace Numbers {
    export abstract class Cardinality {
      isCardinal(
        value: undefined | null | number
      ): boolean {
        return value !== undefined
          && value !== null
          && !Number.isNaN(value);
      }
    }

    export namespace Cardinality {
      export class AnyCardinality extends Cardinality { }
      export class PositiveCardinality extends Cardinality {
        override isCardinal(
          value: undefined | null | number
        ): boolean {
          return super.isCardinal(value)
            && (
              value as number === 0
              || value as number === -0
              || value as number > 0
            );
        }
      }

      export class NegativeCardinality extends Cardinality {
        override isCardinal(
          value: undefined | null | number
        ): boolean {
          return super.isCardinal(value)
            && (
              value as number === 0
              || value as number === -0
              || value as number < 0
            );
        }
      }
    }
  }
}

module.exports = Primitives.Numbers.Cardinality;

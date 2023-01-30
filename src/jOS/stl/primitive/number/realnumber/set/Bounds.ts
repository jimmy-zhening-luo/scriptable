/// <reference path="./../Numbers.ts" />
namespace Numbers {
  export abstract class Bounds {
    isBounded(
      value: undefined | null | number
    ): boolean {
      return value !== undefined
        && value !== null
        && !Number.isNaN(value);
    }
  }

  export namespace Bounds {
    export class InfiniteBounds extends Bounds { }
    export class FiniteBounds extends Bounds {
      override isBounded(
        value: undefined | null | number
      ): boolean {
        return super.isBounded(value)
          && value !== Infinity
          && value !== -Infinity;
      }
    }
  }
}

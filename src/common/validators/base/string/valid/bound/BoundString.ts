const f_CharString: typeof CharString = importModule(
  "charstring/CharString",
) as typeof CharString;

class BoundString<
  V extends string = "Bound",
  T extends stringful = stringful,
> extends f_CharString<
  `Bound:${V}`,
    T
  > {
  public readonly min: posint;
  public readonly max: posinfinint;

  constructor(
    min: number = 1,
    max: number = Infinity,
    ...cStringCtorParams: ConstructorParameters<
      typeof CharString
    >
  ) {
    try {
      const minInt: posint = BoundString.posint(
        min,
        "min",
      );
      const maxInt: posinfinint = BoundString.posinfinint(
        max,
        "max",
      );

      if (minInt > maxInt)
        throw RangeError(
          `min '${minInt}' > max '${maxInt}'`,
          {
            cause: {
              min,
              max,
              minInt,
              maxInt,
              cStringCtorParams,
            },
          },
        );
      else {
        super(...cStringCtorParams);

        if (this.string.length < minInt)
          throw RangeError(
            `length '${this.string.length}' < min '${minInt}' for input: ${this.string}`,
            {
              cause: {
                string: this.string,
                length: this.string.length,
                min,
                max,
                minInt,
                maxInt,
                charset: this.charset.toString(),
                charsetNegate: this.charset.negate,
              },
            },
          );
        else if (this.string.length > maxInt)
          throw RangeError(
            `length '${this.string.length}' > max '${maxInt}' for input: ${this.string}`,
            {
              cause: {
                string: this.string,
                length: this.string.length,
                min,
                max,
                minInt,
                maxInt,
                charset: this.charset.toString(),
                charsetNegate: this.charset.negate,
              },
            },
          );
        else
          [
            this.min,
            this.max,
          ] = [
            minInt,
            maxInt,
          ];
      }
    }
    catch (e) {
      throw new EvalError(
        `BoundString: ctor: { min: ${min}, max: ${max} }`,
        { cause: e },
      );
    }
  }

  private static get posint(): typeof PosInt {
    try {
      return importModule(
        "./common/types/literals/number/PosInt",
      ) as typeof PosInt;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import PosInt`,
        { cause: e },
      );
    }
  }

  private static get posinfinint(): typeof PosInfinInt {
    try {
      return importModule(
        "./common/types/literals/number/PosInfinInt",
      ) as typeof PosInfinInt;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import PosInfinInt`,
        { cause: e },
      );
    }
  }
}

module.exports = BoundString;

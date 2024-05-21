const f_CharString = importModule(
  "charstring/CharString",
) as typeof CharString;

class BoundString<
  T extends stringful,
  V extends string,
> extends f_CharString<
    T,
    `Bound:${
      literalful<V>
    }`
  > {
  public readonly min: posint;
  public readonly max: posinfinint;

  constructor(
    min = 1,
    max = Infinity,
    ...cStringCtorParams: ConstructorParameters<typeof CharString>
  ) {
    try {
      const minInt = BoundString
        .posint(
          min,
          "min",
        );
      const maxInt = BoundString
        .posinfinint(
          max,
          "max",
        );

      if (minInt > maxInt)
        throw RangeError(
          `min > max`,
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
        super(
          ...cStringCtorParams,
        );

        if (
          minInt > this
            .string
            .length
        )
          throw RangeError(
            `length < min`,
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
        else if (
          maxInt < this
            .string
            .length
        )
          throw RangeError(
            `length > max`,
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
            this
              .min,
            this
              .max,
          ] = [
            minInt,
            maxInt,
          ];
      }
    }
    catch (e) {
      throw new EvalError(
        `BoundString: ctor: { min: ${
          min
        }, max: ${
          max
        } }`,
        { cause: e },
      );
    }
  }

  private static get posint() {
    try {
      return importModule(
        "./common/types/safe/acceptors/number/sets/PosInt",
      ) as typeof PosInt;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import PosInt`,
        { cause: e },
      );
    }
  }

  private static get posinfinint() {
    try {
      return importModule(
        "./common/types/safe/acceptors/number/sets/PosInfinInt",
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

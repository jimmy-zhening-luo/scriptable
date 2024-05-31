const f_CharString = importModule(
  `charstring/CharString`,
) as typeof CharString;

class BoundString<
  T extends stringful,
  V extends string,
> extends f_CharString<
    T
    ,
    `Bound:${
      literalful<
        V
      >
    }`
  > {
  constructor(
    min: posint,
    max: posinfinint,
    string: string,
    ...charset: ConstructorParameters<typeof CharSet>
  ) {
    try {
      if (
        min > max
      )
        throw new RangeError(
          `min > max`,
          {
            cause: {
              string,
              length: string.length,
              min,
              max,
            },
          },
        );
      else if (
        min > string
          .length
          || max < string
            .length
      )
        throw new RangeError(
          `string length out-of-bounds`,
          {
            cause: {
              string,
              length: string.length,
              min,
              max,
            },
          },
        );
      else
        super(
          string,
          ...charset,
        );
    }
    catch (e) {
      throw new EvalError(
        `BoundString: ctor`,
        { cause: e },
      );
    }
  }
}

module.exports = BoundString;

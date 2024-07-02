const f_CharString = importModule(
  `charstring/CharString`,
) as typeof CharString;

class BoundString<
  String extends stringful,
  Validator extends string[],
> extends f_CharString<
    String
    ,
    [
      ...Validator,
      `Bound`,
    ]
  > {
  constructor(
    min: Positive<fint>,
    max: Positive<int>,
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

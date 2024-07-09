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
    string: string,
    chars: char[],
    negate: Positive<int>,
    max: Positive<int>,
    min: Positive<fint>,
  ) {
    try {
      if (min > max)
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
        string.length < min
        || string.length > max
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
          chars,
          negate,
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

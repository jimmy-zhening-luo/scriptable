const f_CharString = importModule(
  `charstring/CharString`,
) as typeof CharString;

class BoundString<
  String extends stringful,
  Validator extends string[],
> extends f_CharString<
    String,
    [...Validator, `Bound`]
  > {
  constructor(
    string: string,
    charset: char[],
    filter: Filter,
    min: Positive<fint>,
    max: Positive<int>,
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
          charset,
          filter,
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

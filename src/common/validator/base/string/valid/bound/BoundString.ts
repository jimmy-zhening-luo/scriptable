const _CharString = importModule(
  `charstring/CharString`,
) as typeof CharString;

class BoundString<
  String extends stringful,
  Stamps extends string[],
> extends _CharString<
    String,
    [...Stamps, `Bound`]
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
        throw new RangeError(`min > max`);
      else if (string.length < min || string.length > max)
        throw new TypeError(`string length invalid`);
      else
        super(
          string,
          charset,
          filter,
        );
    }
    catch (e) {
      throw new EvalError(
        `BoundString: ctor ('${string}')`,
        { cause: e },
      );
    }
  }
}

module.exports = BoundString;

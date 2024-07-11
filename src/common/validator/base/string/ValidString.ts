const charString = importModule(
  `charstring/CharString`,
) as typeof CharString;

class ValidString<Validator extends string> extends charString<
  stringful,
  [Validator, `Valid`]
> {
  constructor(
    string: string,
    charset: char[],
    {
      filter = "exclude",
      min = 1 as Positive<fint>,
      max = Infinity as Positive<int>,
    }: {
      filter?: Filter;
      min?: Positive<fint>;
      max?: Positive<int>;
    } = {},
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
        `BoundString: ctor`,
        { cause: e },
      );
    }
  }
}

module.exports = ValidString;

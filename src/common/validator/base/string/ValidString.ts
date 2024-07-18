const charString = importModule<typeof CharString>(
  `charstring/CharString`,
);

class ValidString<Check extends string> extends charString<
  stringful,
  [Check, `Valid`]
> {
  constructor(
    string: string,
    chars: char[],
    {
      filter = "exclude",
      min = 1 as Positive<fint>,
      max = Infinity as Positive<int>,
    }: {
      filter?: CharFilter;
      min?: Positive<fint>;
      max?: Positive<int>;
    } = {},
  ) {
    try {
      const { length } = string;

      if (min > max)
        throw new RangeError(`min > max`);
      else if (length < min || length > max)
        throw new TypeError(`string length invalid`);
      else
        super(
          string,
          filter,
          chars,
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

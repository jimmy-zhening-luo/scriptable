const boundString = importModule(
  `bound/BoundString`,
) as typeof BoundString;

class CleanString<Validator extends string> extends boundString<
  stringful,
  [Validator, `Clean`]
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
      super(
        string,
        charset,
        filter,
        min,
        max,
      );
    }
    catch (e) {
      throw new EvalError(
        `CleanString: ctor`,
        { cause: e },
      );
    }
  }
}

module.exports = CleanString;

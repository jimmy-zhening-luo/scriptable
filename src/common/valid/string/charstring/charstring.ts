class charstring<Validator extends string> {
  public readonly string: valid<stringful, [Validator, "string"]>;

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
        throw new RangeError(`Bad args: min > max`);
      else if (length < min)
        throw new TypeError(`String is too short`);
      else
        this.string = new charstring
          .charset(
            filter,
            chars,
          )
          .of<typeof this["string"]>(string);
    }
    catch (e) {
      throw new Error(
        `charstring`,
        { cause: e },
      );
    }
  }

  private static get charset() {
    try {
      return importModule<typeof charset>(
        "charset/charset",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `charstring: import charset`,
        { cause: e },
      );
    }
  }
}

module.exports = charstring;

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
      filter?: "include" | "exclude";
      min?: Positive<fint>;
      max?: Positive<int>;
    } = {},
  ) {
    try {
      if (min > max)
        throw new RangeError(`Bad args: min > max`);
      else if (string.length < min)
        throw new TypeError(`String is too short`);
      else if (!this[filter](
        string,
        chars,
      ))
        throw new TypeError(`String has disallowed chars`);
      else
        this.string = string;
    }
    catch (e) {
      throw new SyntaxError(
        `charstring`,
        { cause: e },
      );
    }
  }

  private include(string: string, chars: char[]): string is this["string"] {
    return [...string].every(s => chars.includes(s as char));
  }

  private exclude(string: string, chars: char[]): string is this["string"] {
    return [...string].every(s => chars.includes(s as char));
  }
}

module.exports = charstring;

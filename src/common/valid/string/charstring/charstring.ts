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
      const { length } = string;

      if (min > max)
        throw new RangeError(`Bad args: min > max`);
      else if (length < min)
        throw new TypeError(`String is too short`);
      else
        this.string = this.is(
          string,
          filter,
          chars,
        );
    }
    catch (e) {
      throw new Error(
        `charstring`,
        { cause: e },
      );
    }
  }

  public is(
    string: string,
    filter: "include" | "exclude",
    chars: char[],
  ) {
    try {
      if (this[filter](
        string,
        chars,
      ))
        return string;
      else
        throw new TypeError(`String has disallowed chars`);
    }
    catch (e) {
      throw new Error(
        `charset: allows`,
        { cause: e },
      );
    }
  }

  protected include(string: string, chars: char[]): string is this["string"] {
    try {
      return ([...string] as char[])
        .every(stringchar => chars.includes(stringchar));
    }
    catch (e) {
      throw new Error(
        `charset: include`,
        { cause: e },
      );
    }
  }

  protected exclude(string: string, chars: char[]): string is this["string"] {
    try {
      return chars
        .every(char => !string.includes(char));
    }
    catch (e) {
      throw new Error(
        `charset: exclude`,
        { cause: e },
      );
    }
  }
}

module.exports = charstring;

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
          filter,
          string,
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

  private is(
    filter: "include" | "exclude",
    string: string,
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

  private include(string: string, chars: char[]): string is this["string"] {
    try {
      return [...string].every(s => chars.includes(s as char));
    }
    catch (e) {
      throw new Error(
        `charset: include`,
        { cause: e },
      );
    }
  }

  private exclude(string: string, chars: char[]): string is this["string"] {
    try {
      return chars.every(c => !string.includes(c));
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

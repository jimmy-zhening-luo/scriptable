class CharSet {
  constructor(
    public readonly filter: CharFilter,
    public readonly chars: readonly char[],
  ) {}

  public allows<VS extends string>(string: string): string is ([VS] extends [string] ? VS : never) {
    try {
      const { filter } = this;

      return string.length < 1 || this[filter](string);
    }
    catch (e) {
      throw new EvalError(
        `CharSet: allows`,
        { cause: e },
      );
    }
  }

  protected include(string: string) {
    try {
      const { chars } = this;

      return ([...string] as char[])
        .every(stringchar => chars.includes(stringchar));
    }
    catch (e) {
      throw new EvalError(
        `CharSet: include`,
        { cause: e },
      );
    }
  }

  protected exclude(string: string) {
    try {
      const { chars } = this;

      return chars
        .every(char => !string.includes(char));
    }
    catch (e) {
      throw new EvalError(
        `CharSet: include`,
        { cause: e },
      );
    }
  }
}

module.exports = CharSet;

class CharSet {
  public readonly filter;
  public readonly charset;

  constructor(
    filter: Filter,
    ...charset: char[]
  ) {
    try {
      this.filter = filter;
      this.charset = [...charset] as const;
    }
    catch (e) {
      throw new EvalError(
        `CharSet: ctor`,
        { cause: e },
      );
    }
  }

  public allows<Valid extends string>(string: string): string is Valid {
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
      const charstring = [...string] as char[];
      const { charset: chars } = this;

      return charstring.every(
        char =>
          chars.includes(
            char,
          ),
      );
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
      const { charset: chars } = this;

      return chars.every(
        char =>
          !string.includes(
            char,
          ),
      );
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

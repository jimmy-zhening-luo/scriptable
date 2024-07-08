class CharSet {
  public readonly chars: readonly char[];
  public readonly negate: boolean = false;

  constructor(
    negate?:
      | boolean
      | char,
    ...charsets: char[]
  ) {
    try {
      if (typeof negate === "boolean")
        this.negate = negate;
      else if (typeof negate !== "undefined")
        charsets
          .unshift(
            negate,
          );

      this.chars = [...charsets];
    }
    catch (e) {
      throw new EvalError(
        `CharSet: ctor`,
        { cause: e },
      );
    }
  }

  public allows<Valid extends string>(
    string: string,
  ): string is Valid {
    try {
      const {
        negate,
        chars,
      } = this;

      return string.length < 1
        || chars
          .every(
            char =>
              negate !== string
                .includes(
                  char,
                ),
          );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: allows`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return `[${
        this
          .chars
          .join(
            ", ",
          )
      }]`;
    }
    catch (e) {
      throw new EvalError(
        `CharSet: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = CharSet;

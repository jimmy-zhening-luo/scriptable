class CharSet {
  public readonly negate: boolean = false;
  public readonly chars: readonly char[];

  constructor(
    negate: boolean,
    ...chars: char[]
  ) {
    try {
      this.negate = negate;
      this.chars = [...chars];
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

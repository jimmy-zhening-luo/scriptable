class CharSet {
  public readonly chars: char[];
  public readonly negate: boolean = false;

  constructor(
    negate?:
      | boolean
      | Unflat<
        char
      >,
    ...charsets: UnflatArray<
      char
    >
  ) {
    try {
      if (typeof negate === "boolean")
        this
          .negate = negate;
      else if (typeof negate !== "undefined")
        charsets
          .unshift(
            negate,
          );

      this
        .chars = charsets
          .flat();
    }
    catch (e) {
      throw new EvalError(
        `CharSet: ctor`,
        { cause: e },
      );
    }
  }

  public allows<
    V extends string,
  >(
    string: string,
  ): string is V {
    try {
      const negate = this
        .negate;

      return string.length < 1
        || [...string]
          .every(
            char =>
              negate !== this
                .chars
                .includes(
                  char as char,
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

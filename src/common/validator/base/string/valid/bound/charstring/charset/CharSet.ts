class CharSet {
  public readonly chars: readonly char[];
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
      else if (
        typeof negate !== "undefined"
      )
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
    Valid extends string,
  >(
    string: string,
  ): string is Valid {
    try {
      const { negate } = this;

      return string
        .length < 1
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

class CharSet {
  public readonly chars: char[];
  public readonly negate = false;

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

  public allows(
    c: char,
  ): c is validchar {
    try {
      if (
        this.negate !== this
          .chars
          .includes(
            c,
          )
      )
        return true;
      else
        throw new TypeError(
          `char '${
            c
          }' not allowed`,
          {
            cause: {
              "char": c,
              charset: this.toString(),
              negate: this.negate,
            },
          },
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

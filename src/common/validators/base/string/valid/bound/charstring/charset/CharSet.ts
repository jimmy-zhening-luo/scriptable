class CharSet {
  public readonly __proto: literalful<"CharSet"> = "CharSet";
  public readonly chars: char[];
  public readonly negate: boolean;

  constructor(
    negate?:
      | boolean
      | char
      | char[]
      | CharSet,
    ...charsets: Array<
      | char
      | char[]
      | CharSet
    >
  ) {
    try {
      if (typeof negate === "undefined")
        this
          .negate = false;
      else if (typeof negate === "boolean")
        this
          .negate = negate;
      else {
        charsets
          .unshift(
            negate,
          );
        this
          .negate = charsets
            .some(
              set =>
                set instanceof CharSet
                && set
                  .negate,
            );
      }

      this
        .chars = charsets
          .map(
            set =>
              set instanceof CharSet
                ? set
                  .chars
                : [set]
                    .flat(),
          )
          .flat();
    }
    catch (e) {
      throw new EvalError(
        `CharSet: ctor`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown) {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && (instance as { __proto: string }).__proto === "CharSet"
      );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: [Symbol.hasInstance]`,
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
        `CharSet: toString: Failed to format-print CharSet members`,
        { cause: e },
      );
    }
  }
}

module.exports = CharSet;

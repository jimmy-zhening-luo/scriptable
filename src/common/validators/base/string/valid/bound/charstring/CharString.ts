class CharString<
  T extends string,
  V extends string,
> {
  public readonly charset: CharSet;
  public readonly string: validstring<
    T,
    `CharString:${
      literalful<V>
    }`
  >;

  constructor(
    string: string,
    ...charset: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this.charset = new this
        .CharSet(
          ...charset,
        );
      this.string = this
        .validate(
          string,
        );
    }
    catch (e) {
      throw new EvalError(
        `CharString: ctor: `,
        { cause: e },
      );
    }
  }

  private get CharSet() {
    try {
      return importModule(
        "charset/CharSet",
      ) as typeof CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `CharString: import CharSet`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return this
        .string;
    }
    catch (e) {
      throw new EvalError(
        `CharString: toString`,
        { cause: e },
      );
    }
  }

  private validate(
    string: string,
  ) {
    try {
      if (
        this
          .charset
          .allows<CharString<T, V>["string"]>(
            string,
          )
      )
        return string;
      else
        throw new TypeError(
          `string has invalid chars`,
          {
            cause: {
              "string": string,
              charset: this.charset.toString(),
              negate: this.charset.negate,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `CharString: validate`,
        { cause: e },
      );
    }
  }
}

module.exports = CharString;

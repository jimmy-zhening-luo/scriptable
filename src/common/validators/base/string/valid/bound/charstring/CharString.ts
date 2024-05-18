class CharString<
  V extends string = "CharString",
  T extends string = string,
> {
  public readonly charset: CharSet;
  public readonly string: validstring<
    `CharString:${V}`,
    T
  >;

  constructor(
    input: string = "",
    ...charsets: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this.charset = new this.CharSet(
        ...charsets,
      );

      if (this.validate(input))
        this.string = input;
      else
        throw new TypeError(
          `Invalid string`,
          {
            cause: {
              input,
              charset: this.charset.toString(),
              charsetNegate: this.charset.negate,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `CharString: ctor`,
        { cause: e },
      );
    }
  }

  public get CharSet(): typeof CharSet {
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

  public toString(): CharString<V, T>["string"] {
    try {
      return this.string;
    }
    catch (e) {
      throw new EvalError(
        `CharString: toString`,
        { cause: e },
      );
    }
  }

  private validate(
    input: string,
  ): input is CharString<V, T>["string"] {
    try {
      if (input.length < 1)
        return true;
      else if (
        ([...input] as char[])
          .every(
            (c: char): c is validchar =>
              this.charset.allows(c),
          )
      )
        return true;
      else
        throw new TypeError(
          `string contains disallowed chars`,
          {
            cause: {
              input,
              charset: this.charset.toString(),
              charsetNegate: this.charset.negate,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `CharString: validate: invalid string: ${input}`,
        { cause: e },
      );
    }
  }
}

module.exports = CharString;

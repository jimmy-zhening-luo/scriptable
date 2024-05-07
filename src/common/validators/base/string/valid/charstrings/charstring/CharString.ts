class CharString<
  Brand extends string,
  StringLiteral extends string = string,
> {
  public readonly charset: CharSet;
  public readonly string: StringLiteral & CString<Brand>;

  constructor(
    input: string = "",
    ...charsets: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this.charset = new CharString
        .CharSet(...charsets);

      if (!this.validate(input))
        throw new TypeError(
          `Unqualified string: ${input}`,
          {
            cause: {
              input,
              charset: this.charset.toString(),
              charsetNegate: this.charset.negate,
            },
          },
        );
      else
        this.string = input;
    }
    catch (e) {
      throw new EvalError(
        `CharString: ctor`,
        { cause: e },
      );
    }
  }

  public static get CharSet(): typeof CharSet {
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

  public toString(): string {
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
  ): input is StringLiteral & CString<Brand> {
    try {
      if (input.length === 0)
        return true;
      else if (
        ([...input] as char[])
          .every(
            (c: char): boolean =>
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

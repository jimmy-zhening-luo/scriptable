class CharString<S extends string, Checks> {
  public readonly charset: CharSet;
  public readonly string: Valid<S, Checks extends unknown[] ? [...Checks, `String`] : never>;

  constructor(
    string: string,
    ...charset: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this.charset = new CharString.CharSet(...charset);
      this.string = this.validate(string);
    }
    catch (e) {
      throw new EvalError(
        `CharString: ctor: `,
        { cause: e },
      );
    }
  }

  private static get CharSet() {
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

  private validate(string: string) {
    try {
      if (this.charset.allows<Stringify<CharString<S, Checks>>>(string))
        return string;
      else
        throw new TypeError(
          `string has invalid chars`,
          { cause: string },
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

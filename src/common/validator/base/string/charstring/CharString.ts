class CharString<S extends string, Checks extends readonly string[]> {
  public readonly charset: CharSet;
  public readonly string: Valid<S, [...Checks, `String`]>;

  constructor(
    string: string,
    ...charset: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this.charset = new CharString.CharSet(...charset);
      this.string = this.validate(string);
    }
    catch (e) {
      throw new Error(
        `CharString: `,
        { cause: e },
      );
    }
  }

  private static get CharSet() {
    try {
      return importModule<typeof CharSet>(
        "charset/CharSet",
      );
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
      throw new Error(
        `CharString: validate`,
        { cause: e },
      );
    }
  }
}

module.exports = CharString;

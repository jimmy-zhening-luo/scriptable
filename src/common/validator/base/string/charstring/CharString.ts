class CharString<S extends string, Validators extends string[]> {
  public readonly charset: CharSet;
  public readonly string: Valid<S, [...Validators, `String`]>;

  constructor(
    string: string,
    charset: char[],
    filter: Filter,
  ) {
    try {
      this.charset = new this.CharSet(
        filter,
        ...charset,
      );
      this.string = this.validate(string);
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

  private validate(string: string) {
    try {
      if (this.charset.allows<Stringify<CharString<S, Validators>>>(string))
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
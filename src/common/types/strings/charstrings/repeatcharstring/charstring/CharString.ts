abstract class CharString {
  public readonly charset: CharSet;
  private readonly _raw: string;

  constructor(
    candidate: string = "",
    ...charsets: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this._raw = candidate;
      this.charset = new CharString
        .CharSet(
          ...charsets,
        );
    }
    catch (e) {
      throw new EvalError(
        `CharString: ctor: \n${e as string}`,
      );
    }
  }

  public static get CharSet(): typeof CharSet {
    try {
      return importModule("charset/CharSet") as typeof CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `CharString: import CharSet: \n${e as string}`,
      );
    }
  }

  public get value(): string {
    try {
      if (!this._qualifies(
        this._raw,
      ))
        throw new SyntaxError(
          `Unqualified: ${this._raw}`,
        );
      else
        return this._raw;
    }
    catch (e) {
      throw new EvalError(
        `CharString: value: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.value;
    }
    catch (e) {
      throw new EvalError(
        `CharString: toString: \n${e as string}`,
      );
    }
  }

  protected abstract _qualifies(candidate: string): boolean;
}

module.exports = CharString;

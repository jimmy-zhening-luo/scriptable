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
        `CharString: ctor`,
        { cause: e },
      );
    }
  }

  public static get CharSet(): typeof CharSet {
    try {
      return importModule("charset/CharSet") as typeof CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `CharString: import CharSet`,
        { cause: e },
      );
    }
  }

  public get value(): string {
    try {
      if (!this._qualifies(
        this._raw,
      ))
        throw new TypeError(
          `Unqualified string: ${this._raw}`,
        );
      else
        return this._raw;
    }
    catch (e) {
      throw new EvalError(
        `CharString: value`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this.value;
    }
    catch (e) {
      throw new EvalError(
        `CharString: toString`,
        { cause: e },
      );
    }
  }

  protected abstract _qualifies(candidate: string): boolean;
}

module.exports = CharString;

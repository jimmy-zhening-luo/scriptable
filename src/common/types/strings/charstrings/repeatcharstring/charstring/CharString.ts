abstract class CharString {
  public readonly charset: CharSet;
  private readonly _raw: string;

  constructor(
    candidate: string = "",
    ...charsets: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this._raw = candidate;
      this.charset = new CharString.CharSets.CharSet(...charsets);
    }
    catch (e) {
      throw new EvalError(
        `CharString: ctor: \n${e as string}`,
      );
    }
  }

  public static get CharSets(): typeof CharSets {
    try {
      return importModule("charsets/CharSets") as typeof CharSets;
    }
    catch (e) {
      throw new ReferenceError(
        `CharString: import CharSets: \n${e as string}`,
      );
    }
  }

  public get isValid(): boolean {
    try {
      if (this._isValid === undefined)
        this._isValid = this._qualifies(this._raw);

      return this._isValid;
    }
    catch (e) {
      throw new EvalError(
        `CharString: isValid: \n${e as string}`,
      );
    }
  }

  public get value(): null | string {
    try {
      return this.isValid
        ? this._raw
        : null;
    }
    catch (e) {
      throw new EvalError(
        `CharString: value: Error getting CharString value: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.value ?? "";
    }
    catch (e) {
      throw new EvalError(
        `CharString: toString: Error converting CharString to string: \n${e as string}`,
      );
    }
  }

  protected abstract _qualifies(candidate: string): boolean;
  private _isValid?: boolean;
}

module.exports = CharString;

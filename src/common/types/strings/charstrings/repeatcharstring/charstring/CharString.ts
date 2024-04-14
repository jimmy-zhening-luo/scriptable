abstract class CharString {
  public readonly charset: CharSet;
  public readonly isValid: boolean;
  private readonly _raw: string;

  constructor(
    candidate: string = "",
    ...charsets: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this._raw = candidate;
      this.charset = new CharString.CharSets.CharSet(...charsets);
      this.isValid = this._qualifies(this._raw);
    }
    catch (e) {
      throw new Error(
        `CharString: constructor: Error creating CharString object: \n${e as string}`,
      );
    }
  }

  public static get CharSets(): typeof CharSets {
    try {
      return importModule("charsets/CharSets") as typeof CharSets;
    }
    catch (e) {
      throw new ReferenceError(
        `CharString: CharSets: Error importing CharSets module: \n${e as string}`,
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
}

module.exports = CharString;

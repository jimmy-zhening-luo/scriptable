abstract class CharString {
  public readonly charset: CharSet;
  private readonly _raw: string;

  constructor(
    candidateCharString: string = "",
    ...charsetCtorParams: ConstructorParameters<typeof CharSet>
  ) {
    try {
      this._raw = candidateCharString;
      this.charset = new CharString.CharSets.CharSet(...charsetCtorParams);
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

  public get isValid(): boolean {
    try {
      return this._qualifies(this._raw);
    }
    catch (e) {
      throw new EvalError(
        `CharString: isValid: Error checking if CharString is valid: \n${e as string}`,
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

  protected abstract _qualifies(candidateCharString: string): boolean;
}

module.exports = CharString;

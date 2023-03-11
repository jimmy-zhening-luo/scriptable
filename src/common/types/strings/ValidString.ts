class ValidString {
  readonly raw: string;
  readonly min: number;
  readonly max: number;

  readonly cleaned: string;
  readonly value: null | string;
  readonly isImplicitlyInvalid: boolean;

  constructor(
    string: string,
    min: number | CharSet.CharInput = ValidString.MinDefault,
    max: number | CharSet.CharInput = ValidString.MaxDefault,
    cleanOptions: Parameters<typeof ValidString.clean>[1] = {},
    {
      negateAllowedChars = false,
      isValid = true,
    }: {
      negateAllowedChars?: boolean;
      isValid?: boolean;
    },
    ...allowedChars: CharSet.CharInput[]
  ) {
    try {
      this.raw = string;
      this.min = this._parseBoundsNumber(min, ValidString.MinDefault);
      this.max = this._parseBoundsNumber(max, ValidString.MaxDefault);

      this.cleaned = ValidString.clean(this.raw, cleanOptions);
      this.isImplicitlyInvalid = !isValid;

      this.value =
        this.isImplicitlyInvalid ||
        this.cleaned.length > this.max ||
        this.cleaned.length < this.min
          ? null
          : ValidString.parseStringToOneGrams(this.cleaned)
              .map(
                ngram =>
                  new ValidString.CharStrings.OneCharString(
                    ngram.toString(),
                    ...allowedChars,
                  ),
              )
              .every(charstring => charstring.isValid === !negateAllowedChars)
          ? this.cleaned
          : null;
    } catch (e) {
      throw new Error(
        `ValidString: constructor: Error creating ValidString object: \n${e}`,
      );
    }
  }

  private _parseBoundsNumber(
    bound: ConstructorParameters<typeof ValidString>[1],
    fallback: number,
  ): typeof ValidString.prototype.min {
    try {
      return typeof bound === "number"
        ? new ValidString.PositiveInteger(bound).value ?? fallback
        : fallback;
    } catch (e) {
      throw new EvalError(
        `ValidString: _parseBoundsNumber: Error parsing bounds number: \n${e}`,
      );
    }
  }

  get isValid(): boolean {
    try {
      return this.value !== null;
    } catch (e) {
      throw new EvalError(
        `ValidString: isValid: Error getting validity: \n${e}`,
      );
    }
  }

  get length(): number {
    try {
      return this.value?.length ?? 0;
    } catch (e) {
      throw new EvalError(`ValidString: length: Error getting length: \n${e}`);
    }
  }

  toString(): string {
    try {
      return this.value ?? "";
    } catch (e) {
      throw new EvalError(
        `ValidString: toString: Error converting to string: \n${e}`,
      );
    }
  }

  static clean(
    raw: string,
    {
      toLower = false,
      trim = false,
      trimLeadingExcept = false,
      trimTrailingExcept = false,
      trimLeading = [],
      trimTrailing = [],
    }: {
      toLower?: boolean;
      trim?: boolean;
      trimLeadingExcept?: boolean;
      trimTrailingExcept?: boolean;
      trimLeading?: string[];
      trimTrailing?: string[];
    },
  ): typeof ValidString.prototype.cleaned {
    try {
      if (toLower === true) raw = raw.toLowerCase();
      if (trim === true) raw = raw.trim();
      const preprocessed: string = raw;
      return ValidString.trimEdge(
        ValidString.trimEdge(
          preprocessed,
          trimLeading,
          ValidString.Edge.Leading,
          trimLeadingExcept,
        ),
        trimTrailing,
        ValidString.Edge.Trailing,
        trimTrailingExcept,
      );
    } catch (e) {
      throw new EvalError(`ValidString: clean: Error cleaning string: \n${e}`);
    }
  }

  static trimEdge(
    string: ConstructorParameters<typeof ValidString>[0],
    wordsToTrim: string[] = [],
    edge: ValidString.Edge,
    trimExcept: boolean = false,
  ): string {
    try {
      const isLeading: boolean = edge === ValidString.Edge.Leading;
      type LookPrototypeFunction = "startsWith" | "endsWith";
      const lookFn: LookPrototypeFunction = isLeading
        ? "startsWith"
        : "endsWith";
      const lookCondition: boolean = !trimExcept;
      wordsToTrim
        .filter(word => word !== "")
        .forEach(word => {
          while (string[lookFn](word) === lookCondition)
            string = isLeading
              ? string.slice(trimExcept ? 1 : word.length)
              : string.slice(0, 0 - (trimExcept ? 1 : word.length));
        });
      return string;
    } catch (e) {
      throw new EvalError(`ValidString: trimEdge: Error trimming edge: \n${e}`);
    }
  }

  static parseStringToOneGrams(
    string: ConstructorParameters<typeof ValidString>[0],
  ): NGram[] {
    try {
      return [...string].map(char => new ValidString.OneGram(char));
    } catch (e) {
      throw new EvalError(
        `ValidString: parseStringToOneGrams: Error parsing string to one grams: \n${e}`,
      );
    }
  }

  static get OneGram(): typeof OneGram {
    try {
      return importModule("words/OneGram");
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing OneGram module: \n${e}`,
      );
    }
  }

  static get NGram(): typeof NGram {
    try {
      return ValidString.OneGram.NGram;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing NGram module: \n${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return ValidString.OneGram.NGram.PositiveInteger;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing PositiveInteger module: \n${e}`,
      );
    }
  }

  static get CharStrings(): typeof CharStrings {
    try {
      return importModule("charstrings/CharStrings");
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing CharStrings module: \n${e}`,
      );
    }
  }

  static get Chars(): typeof Chars {
    try {
      return ValidString.CharStrings.Chars;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing Chars module: \n${e}`,
      );
    }
  }

  static get CharSet(): typeof CharSet {
    try {
      return ValidString.Chars.CharSet;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing CharSet module: \n${e}`,
      );
    }
  }

  static get UrlCharSet(): typeof UrlCharSet {
    try {
      return ValidString.Chars.UrlCharSet;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing UrlCharSet module: \n${e}`,
      );
    }
  }
}

namespace ValidString {
  export const MinDefault: number = 0;
  export const MaxDefault: number = Infinity;

  export enum Edge {
    Leading,
    Trailing,
  }
}

module.exports = ValidString;

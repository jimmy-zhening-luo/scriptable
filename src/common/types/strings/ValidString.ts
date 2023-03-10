class ValidString {
  readonly raw: string;
  readonly min: number;
  readonly max: number;

  readonly cleaned: string;
  readonly value: null | string;
  readonly isImplicitlyInvalid: boolean;

  constructor(
    string: string,
    min: number | Char.CharInput = ValidString.MinDefault,
    max: number | Char.CharInput = ValidString.MaxDefault,
    cleanOptions: Parameters<typeof ValidString.clean>[1] = {},
    {
      negateAllowedChars = false,
      isValid = true,
    }: {
      negateAllowedChars?: boolean;
      isValid?: boolean;
    },
    ...allowedChars: Char.CharInput[]
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
                  new ValidString.OneCharString(
                    ngram.toString(),
                    ...allowedChars,
                  ),
              )
              .every(charstring => charstring.isValid === !negateAllowedChars)
          ? this.cleaned
          : null;
    } catch (e) {
      throw new Error(
        `ValidString: constructor: Error creating ValidString object: ${e}`,
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
        `ValidString: _parseBoundsNumber: Error parsing bounds number: ${e}`,
      );
    }
  }

  get isValid(): boolean {
    try {
      return this.value !== null;
    } catch (e) {
      throw new EvalError(`ValidString: isValid: Error getting validity: ${e}`);
    }
  }

  get length(): number {
    try {
      return this.value?.length ?? 0;
    } catch (e) {
      throw new EvalError(`ValidString: length: Error getting length: ${e}`);
    }
  }

  toString(): string {
    try {
      return this.value ?? "";
    } catch (e) {
      throw new EvalError(
        `ValidString: toString: Error converting to string: ${e}`,
      );
    }
  }

  static clean(
    string: string,
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
      string = toLower ? string.toLowerCase() : string;
      string = trim ? string.trim() : string;
      const preprocessed: string = string;
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
      throw new EvalError(`ValidString: clean: Error cleaning string: ${e}`);
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
      throw new EvalError(`ValidString: trimEdge: Error trimming edge: ${e}`);
    }
  }

  static parseStringToOneGrams(
    string: ConstructorParameters<typeof ValidString>[0],
  ): NGram[] {
    try {
      return [...string].map(char => new ValidString.OneGram(char));
    } catch (e) {
      throw new EvalError(
        `ValidString: parseStringToOneGrams: Error parsing string to one grams: ${e}`,
      );
    }
  }

  static get CharStrings(): typeof CharStrings {
    try {
      return importModule("charstrings/CharStrings");
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing CharStrings module: ${e}`,
      );
    }
  }

  static get Chars(): typeof Chars {
    try {
      return ValidString.CharStrings.Chars;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing Chars module: ${e}`,
      );
    }
  }

  static get Char(): typeof Char {
    try {
      return ValidString.Chars.Char;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing Char module: ${e}`,
      );
    }
  }

  static get UrlChar(): typeof UrlChar {
    try {
      return ValidString.Chars.UrlChar;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing UrlChar module: ${e}`,
      );
    }
  }

  static get OneGram(): typeof OneGram {
    try {
      return importModule("words/ngram/NGram");
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing OneGram module: ${e}`,
      );
    }
  }

  static get OneCharString(): typeof OneCharString {
    try {
      return ValidString.CharStrings.OneCharString;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing OneCharString module: ${e}`,
      );
    }
  }
  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return ValidString.OneGram.NGram.PositiveInteger;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing PositiveInteger module: ${e}`,
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

class ValidString {

  readonly raw: string;
  readonly min: number;
  readonly max: number;

  readonly cleaned: string;
  readonly value: null | string;
  readonly isImplicitlyInvalid: boolean;

  constructor(
    string: string,
    min:
      | number
      | Char.CharInput  = ValidString.MinDefault,
    max:
      | number
      | Char.CharInput = ValidString.MaxDefault,
    cleanOptions: Parameters<typeof ValidString.clean>[1] = {},
    {
      negateAllowedChars = false,
      isValid = true
    }: {
      negateAllowedChars?: boolean,
      isValid?: boolean
    },
    ...allowedChars: Char.CharInput[]
  ) {
    this.raw = string;
    this.min = this.parseBound(min, ValidString.MinDefault);
    this.max = this.parseBound(max, ValidString.MaxDefault);

    this.cleaned = ValidString.clean(
      this.raw,
      cleanOptions
    );
    this.isImplicitlyInvalid = !isValid;

    this.value = this.isImplicitlyInvalid
      || this.cleaned.length > this.max
      || this.cleaned.length < this.min
      ?
      null
      : ValidString.parseStringToOneGrams(this.cleaned)
        .map(ngram =>
          new ValidString.OneCharString(
            ngram.toString(),
            ...allowedChars
          )
        ).every(charstring =>
          charstring.isValid === !negateAllowedChars
        ) ?
        this.cleaned
        : null;
  }

  private parseBound(
    bound: ConstructorParameters<typeof ValidString>[1],
    fallback: number
  ): typeof ValidString.prototype.min {
    return typeof bound === "number" ?
      new ValidString.PositiveInteger(bound).value ?? fallback
      : fallback;
  }

  get isValid(): boolean {
    return this.value !== null;
  }

  get length(): number {
    return this.value?.length ?? 0;
  }

  toString(): string {
    return this.value ?? "";
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
      toLower?: boolean,
      trim?: boolean,
      trimLeadingExcept?: boolean,
      trimTrailingExcept?: boolean,
      trimLeading?: string[],
      trimTrailing?: string[]
    }
  ): typeof ValidString.prototype.cleaned {
    string = toLower ? string.toLowerCase() : string;
    string = trim ? string.trim() : string;
    const preprocessed: string = string;
    return ValidString.trimEdge(
      ValidString.trimEdge(
        preprocessed,
        trimLeading,
        ValidString.Edge.Leading,
        trimLeadingExcept
      ),
      trimTrailing,
      ValidString.Edge.Trailing,
      trimTrailingExcept
    );
  }

  static trimEdge(
    string: ConstructorParameters<typeof ValidString>[0],
    wordsToTrim: string[] = [],
    edge:
      | ValidString.Edge,
    trimExcept: boolean = false
  ): string {
    const isLeading: boolean =
      edge === ValidString.Edge.Leading;
    type LookPrototypeFunction =
      | "startsWith"
      | "endsWith";
    const lookFn: LookPrototypeFunction = isLeading ?
      "startsWith"
      : "endsWith";
    const lookCondition: boolean = !trimExcept;
    wordsToTrim
      .filter(word => word !== "")
      .forEach(word => {
        while (string[lookFn](word) === lookCondition)
          string = isLeading ?
            string.slice(
              trimExcept ?
                1
                : word.length
            )
            : string.slice(
              0,
              0 - (
                trimExcept ?
                  1
                  : word.length
              )
            );
      });
    return string;
  }

  static parseStringToOneGrams(
    string: ConstructorParameters<typeof ValidString>[0],
  ): NGram[] {
    return [...string]
      .map(
        char => new ValidString.OneGram(
          char
        )
      );
  }

  get Chars(): typeof Chars {
    return ValidString.Chars;
  }

  get Char(): typeof Char {
    return ValidString.Char;
  }

  get UrlChar(): typeof UrlChar {
    return ValidString.UrlChar;
  }

  static get CharStrings(): typeof CharStrings {
    return importModule("charstrings/CharStrings");
  }

  static get Words(): typeof Words {
    return importModule("words/Words");
  }

  static get Chars(): typeof Chars {
    return ValidString.CharStrings.Chars;
  }

  static get Char(): typeof Char {
    return ValidString.Chars.Char;
  }

  static get UrlChar(): typeof UrlChar {
    return ValidString.Chars.UrlChar;
  }

  static get OneGram(): typeof OneGram {
    return ValidString.Words.OneGram;
  }

  static get OneCharString(): typeof OneCharString {
    return ValidString.CharStrings.OneCharString;
  }

  static get PositiveInteger(): typeof PositiveInteger {
    return importModule("./common/types/numbers/PositiveInteger");
  }

}

namespace ValidString {

  export const MinDefault: number = 0;
  export const MaxDefault: number = Infinity;

  export enum Edge {
    Leading,
    Trailing
  }

}

module.exports = ValidString;

class ValidString {

  readonly raw: string;
  readonly cleaned: string;
  readonly value: null | string;

  constructor(
    text: string,
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
    },
    {
      minLength = 0,
      maxLength = Infinity,
      negateAllowedChars = false,
      isValid = true
    }: {
      minLength?: number,
      maxLength?: number,
      negateAllowedChars?: boolean,
      isValid?: boolean
    },
    ...allowedChars: Char.CharInput[]
  ) {
    this.raw = text;
    this.cleaned = ValidString.clean(
      this.raw,
      {
        toLower,
        trim,
        trimLeading,
        trimTrailing,
        trimLeadingExcept,
        trimTrailingExcept
      }
    );

    minLength = new ValidString.PositiveInteger(maxLength).value ?? 0;

    maxLength = new ValidString.PositiveInteger(maxLength).value ?? Infinity;

    this.value = !isValid
      || this.cleaned.length > maxLength
      || this.cleaned.length < minLength
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

  get isValid(): boolean {
    return this.value !== null;
  }

  get length(): number {
    return this
      .value
      ?.length ?? 0;
  }

  toString(): string {
    return this.value ?? "";
  }


  static parseStringToOneGrams(
    text: string
  ): NGram[] {
    return [...text]
      .map(
        char => new ValidString.OneGram(
          char
        )
      );
  }

  static clean(
    text: string,
    options?: ConstructorParameters<typeof ValidString>[1]
  ): string {
    return options === undefined ?
      text
      : ValidString.trimEdge(
        ValidString.trimEdge(
          text,
          options.trimLeading,
          ValidString.Edge.Leading,
          options.trimLeadingExcept
        ),
        options.trimTrailing,
        ValidString.Edge.Trailing,
        options.trimTrailingExcept
      );
  }

  static trimEdge(
    text: string,
    wordsToTrim: string[] = [],
    edge:
      | ValidString.Edge
      | keyof typeof ValidString.Edge = ValidString.Edge.Trailing,
    trimExcept: boolean = false
  ): string {
    const isLeading: boolean =
      edge === ValidString.Edge.Leading
      || edge === "Leading";
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
        while (text[lookFn](word) === lookCondition)
          text = isLeading ?
            text.slice(
              trimExcept ?
                1
                : word.length
            )
            : text.slice(
              0,
              0 - (
                trimExcept ?
                  1
                  : word.length
              )
            );
      });
    return text;
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
    return importModule("./system/application/common/primitives/numbers/PositiveInteger");
  }

}

namespace ValidString {

  export enum Edge {
    Leading,
    Trailing
  }

}

module.exports = ValidString;

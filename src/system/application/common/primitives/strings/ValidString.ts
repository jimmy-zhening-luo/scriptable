class ValidString {
  readonly raw: string;
  readonly cleaned: string;
  readonly value: null | string;
  constructor(
    text: string,
    {
      toLower = false,
      trim = false,
      trimLeading = [],
      trimTrailing = [],
    }: {
      toLower?: boolean,
      trim?: boolean,
      trimLeading?: string[],
      trimTrailing?: string[]
    },
    {
      minLength = 0,
      maxLength = Infinity
    }: {
      minLength?: number,
      maxLength?: number
    },
    ...allowedChars: Char.CharInput[]
  ) {
    this.raw = text;
    this.cleaned = clean(
      this.raw,
      toLower,
      trim,
      trimLeading,
      trimTrailing
    );

    minLength = new ValidString.PositiveInteger(maxLength).value ?? 1;

    maxLength = new ValidString.PositiveInteger(maxLength).value ?? Infinity;

    this.value = (
      this.cleaned.length > maxLength
      || this.cleaned.length < minLength
    ) ?
      null
      : parseStringToOneGrams(this.cleaned)
        .map(ngram => new ValidString
          .OneCharString(
            ngram.toString(),
            ...allowedChars
          )
        ).every(charstring => charstring.isValid) ?
        this.cleaned
        : null;

    function clean(
      text: string,
      toLower: boolean,
      trim: boolean,
      trimLeading: string[],
      trimTrailing: string[]
    ): string {
      return postTrim(
        preTrim(trim ?
          toLower ?
            text.toLowerCase().trim()
            : text.trim()
          : toLower ?
            text.toLowerCase()
            : text,
          trimLeading
        ),
        trimTrailing
      );

      function preTrim(
        text: string,
        wordsToTrim: string[]
      ): string {
        wordsToTrim
          .filter(word => word !== "")
          .forEach(word => {
            while (text.startsWith(word))
              text = text.slice(word.length);
          });
        return text;
      }

      function postTrim(
        text: string,
        wordsToTrim: string[]
      ): string {
        wordsToTrim
          .filter(word => word !== "")
          .forEach(word => {
            while (text.endsWith(word))
              text = text.slice(0, 0 - word.length);
          });
        return text;
      }
    }

    function parseStringToOneGrams(text: string): NGram[] {
      return [...text]
        .map(char => new ValidString.OneGram(char));
    }
  }

  get isValid(): boolean {
    return this.value !== null;
  }

  toString(): string {
    return this.value ?? "";
  }

  get Char(): typeof Char {
    return ValidString.Char;
  }

  static get OneGram(): typeof OneGram {
    return importModule("words/OneGram");
  }

  static get OneCharString(): typeof OneCharString {
    return importModule("charstrings/OneCharString");
  }

  static get PositiveInteger(): typeof PositiveInteger {
    return importModule("./system/application/common/primitives/numbers/PositiveInteger");
  }

  static get Char(): typeof Char {
    return ValidString.OneCharString.Char;
  }

}

module.exports = ValidString;

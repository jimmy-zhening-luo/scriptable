abstract class StringValidator {
  readonly raw: string;
  readonly allowedChars: Array<OneRepeatedChar>;
  readonly cleaned: string;
  constructor(
    text: string,
    {
      toLower = false,
      trim = true,
      trimLeading = [],
      trimTrailing = []
    }: {
      toLower?: boolean,
      trim?: boolean,
      trimLeading?: Array<string>,
      trimTrailing?: Array<string>
    },
    ...allowedChars: Array<StringValidator.StringValidatorInput>
  ) {
    this.raw = text;
    this.allowedChars = this
      .parseStringValidatorInput(...allowedChars);
    this.cleaned = this
      .clean(
        text,
        toLower,
        trim,
        trimLeading,
        trimTrailing
      );
  }

  private parseStringValidatorInput(
    ...allowedCharsInput: Array<StringValidator.StringValidatorInput>
  ): Array<OneRepeatedChar> {
    const parsedPatterns: Array<OneRepeatedChar> = [];
    allowedCharsInput.forEach(
      (input) => {
        if (input instanceof StringValidator)
          parsedPatterns.push(...input.allowedChars);
        else if (input instanceof OneRepeatedChar)
          parsedPatterns.push(input);
        else
          parsedPatterns.push(new OneRepeatedChar(input));
      }
    );
    return parsedPatterns;
  }

  private clean(
    text: string,
    toLower: boolean,
    trim: boolean,
    trimLeading: Array<string>,
    trimTrailing: Array<string>
  ): string {
    return postTrim(
      preTrim(
        trim ?
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
        .filter(
          (word: string) => (
            word.length > 0
          )
        )
        .forEach(
          (word: string) => {
            while (text.startsWith(word))
              text = text.slice(
                word.length
              );
          }
        );
      return text;
    }

    function postTrim(
      text: string,
      wordsToTrim: string[]
    ): string {
      wordsToTrim
        .filter(
          (word: string) => (
            word.length > 0
          )
        )
        .forEach(
          (word: string) => {
            while (text.endsWith(word))
              text = text.slice(
                0,
                0 - word.length
              );
          }
        );
      return text;
    }
  }

  get validated(): string {
    return this.isValid ?
      this.cleaned
      : String();
  }

  get isValid(): boolean {
    return this.oneGrams.every(
      (oneGram) => (
        this.allowedChars.some(
          (oneRepeatedChar) => (
            oneRepeatedChar.match(oneGram.word)
          )
        )
      )
    );
  }

  private get oneGrams(): OneGram[] {
    return splitStringIntoOneGrams(
      this.cleaned
    );

    function splitStringIntoOneGrams(
      text: string
    ): OneGram[] {
      return [...text]
        .map(
          (char) => (
            new OneGram(char)
          )
        );
    }
  }
}

export namespace StringValidator {
  export type StringValidatorInput = StringValidator
    | OneRepeatedChar
    | CharSet.CharSetInput;
}

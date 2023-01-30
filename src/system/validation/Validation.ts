namespace Validation {
  //export const RealNumber = importModule("./system/number/RealNumber");

  //import type * as Types from "./../number/RealNumber"





  export abstract class Gram {
    readonly word: string;
    constructor(
      word: string
    ) {
      this.word = word;
    }

    get length(): number {
      return this.word.length;
    }

    get string(): string {
      return this.word;
    }

    toString(): string {
      return this.string;
    }
  }

  export namespace Gram {
    export class NGram extends Gram {
      readonly n: number;
      readonly remainder: string;
      constructor(
        text: string,
        n: number = 1
      ) {
        n = Number.isNaN(n) ?
          1
          : Number.isFinite(n) ?
            n >= 1 ?
              Math.round(n)
              : 1
            : n !== -Infinity ?
              Infinity
              : 1;
        super(
          n === Infinity ?
            text
            : text.length >= n ?
              text.slice(0, n)
              : String()
        );
        this.n = n;
        this.remainder = text
          .slice(this.word.length);
      }

      get isToken(): boolean {
        return this.word.length > 0;
      }

      get valid(): boolean {
        return this.isToken;
      }

      get deterministic(): boolean {
        return Number.isFinite(this.n);
      }

      get hasRemainder(): boolean {
        return this.remainder.length > 0;
      }
    }

    export namespace NGram {
      export class OneGram extends NGram {
        constructor(
          text: string
        ) {
          super(text, 1);
        }
      }
    }
  }

  export abstract class StringValidator {
    readonly raw: string;
    readonly allowedChars: Array<Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar>;
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
    ): Array<Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar> {
      const parsedPatterns: Array<Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar> = [];
      allowedCharsInput.forEach(
        (input) => {
          if (input instanceof StringValidator)
            parsedPatterns.push(...input.allowedChars);
          else if (input instanceof Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar)
            parsedPatterns.push(input);
          else
            parsedPatterns.push(new Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar(input));
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

    private get oneGrams(): Gram.NGram.OneGram[] {
      return splitStringIntoOneGrams(
        this.cleaned
      );

      function splitStringIntoOneGrams(
        text: string
      ): Gram.NGram.OneGram[] {
        return [...text]
          .map(
            (char) => (
              new Gram.NGram.OneGram(char)
            )
          );
      }
    }
  }

  export namespace StringValidator {
    export type StringValidatorInput = StringValidator
      | Pattern.RepeatedChar.MinMaxRepeatedChar.NRepeatedChar.OneRepeatedChar
      | CharSet.CharSetInput;
  }
}

module.exports = Validation;

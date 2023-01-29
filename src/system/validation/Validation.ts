namespace _Validation {
  export const RealNumber = importModule("./system/number/RealNumber");
  
  export class CharSet {
    readonly chars: string[];
    constructor(
      ...charSets: CharSet.CharSetInput[]
    ) {
      this.chars = new Array<string>();
      charSets.forEach(
        (charset: CharSet.CharSetInput) => {
          charset instanceof CharSet ?
            this.chars.push(
              ...charset.chars
            )
            : Array.isArray(charset) ?
              this.chars.push(...charset)
              : this.chars.push(charset);
        }
      );
    }

    includes(char: string): boolean {
      return this.chars.includes(char);
    }

    static get alphaNumeric(): Array<string> {
      return [
        ...this.numbers,
        ...this.alpha
      ];
    }

    static get alphaNumericLower(): Array<string> {
      return [
        ...this.numbers,
        ...this.alphaLower
      ];
    }

    static get alphaNumericUpper(): Array<string> {
      return [
        ...this.numbers,
        ...this.alphaUpper
      ];
    }

    static get numbers(): Array<string> {
      return [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ];
    }

    static get alpha(): Array<string> {
      return [
        ...this.alphaLower,
        ...this.alphaUpper
      ];
    }

    static get alphaLower(): Array<string> {
      return [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
    }

    static get alphaUpper(): Array<string> {
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
    }

    static get dot(): string {
      return ".";
    }

    static get plus(): string {
      return "+";
    }

    static get hyphen(): string {
      return "-";
    }

    static get dollar(): string {
      return "$";
    }

    static get underscore(): string {
      return "_";
    }

    static get exclam(): string {
      return "!";
    }

    static get asterisk(): string {
      return "*";
    }

    static get quote(): string {
      return "'";
    }

    static get leftParen(): string {
      return "(";
    }

    static get rightParen(): string {
      return ")";
    }

    static get comma(): string {
      return ",";
    }

    static get leftBrace(): string {
      return "{";
    }

    static get rightBrace(): string {
      return "}";
    }

    static get or(): string {
      return "|";
    }

    static get backslash(): string {
      return "\\";
    }

    static get caret(): string {
      return "^";
    }

    static get tilde(): string {
      return "~";
    }

    static get leftBracket(): string {
      return "[";
    }

    static get rightBracket(): string {
      return "]";
    }

    static get backTick(): string {
      return "`";
    }

    static get lessThan(): string {
      return "<";
    }

    static get greaterThan(): string {
      return ">";
    }

    static get hash(): string {
      return "#";
    }

    static get percent(): string {
      return "%";
    }

    static get doubleQuote(): string {
      return "\"";
    }

    static get semicolon(): string {
      return ";";
    }

    static get slash(): string {
      return "/";
    }

    static get question(): string {
      return "?";
    }

    static get colon(): string {
      return ":";
    }

    static get at(): string {
      return "@";
    }

    static get and(): string {
      return "&";
    }

    static get equal(): string {
      return "=";
    }

    static get space(): string {
      return " ";
    }
  }

  export namespace CharSet {
    export type CharSetInput = CharSet
      | string[]
      | string;

    export class UrlCharSet extends CharSet {
      static get safe(): Array<string> {
        return [
          this.dollar,
          this.hyphen,
          this.underscore,
          this.dot,
          this.plus
        ];
      }

      static get extra(): Array<string> {
        return [
          this.exclam,
          this.asterisk,
          this.quote,
          this.leftParen,
          this.rightParen,
          this.comma
        ];
      }

      static get national(): Array<string> {
        return [
          this.leftBrace,
          this.rightBrace,
          this.or,
          this.backslash,
          this.caret,
          this.tilde,
          this.leftBracket,
          this.rightBracket,
          this.backTick
        ];
      }

      static get punctuation(): Array<string> {
        return [
          this.lessThan,
          this.greaterThan,
          this.hash,
          this.percent,
          this.doubleQuote
        ];
      }

      static get hex(): Array<string> {
        return [
          ...this.numbers,
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ];
      }

      static get unreserved(): Array<string> {
        return [
          ...this.alphaNumeric,
          ...this.safe,
          ...this.extra
        ];
      }
    }
  }

  export namespace Pattern {
    export abstract class RepeatedChar {
      readonly charset: CharSet;
      constructor(
        ...charsets: Array<RepeatedChar.RepeatedCharInput>
      ) {
        const chars: Array<string> = [];
        charsets.forEach(
          (charset) => {
            if (charset instanceof RepeatedChar)
              chars.push(...charset.charset.chars);
            else if (charset instanceof CharSet)
              chars.push(...charset.chars);
            else if (Array.isArray(charset))
              chars.push(...charset);
            else
              chars.push(charset);
          }
        );
        this.charset = new CharSet(chars);
      }

      abstract match(token: string): boolean;
    }

    export namespace RepeatedChar {
      export type RepeatedCharInput = RepeatedChar
        | CharSet.CharSetInput;

      export class MinMaxRepeatedChar extends RepeatedChar {
        readonly minReps: number;
        readonly maxReps: number;
        constructor(
          minReps: number,
          maxReps: number,
          ...charsets: Array<RepeatedCharInput>
        ) {
          super(...charsets);
          if (
            minReps < 0
            || maxReps < 0
            || Number.isNaN(minReps)
            || Number.isNaN(maxReps)
          )
            minReps = maxReps = 0;

          if (minReps > maxReps) {
            const tmp: number = minReps;
            minReps = maxReps;
            maxReps = tmp;
          }

          if (!Number.isFinite(minReps))
            this.minReps = this.maxReps = 0;
          else {
            this.minReps = minReps;
            this.maxReps = maxReps;
          }
        }

        match(token: string): boolean {
          return token.length >= this.minReps
            && token.length <= this.maxReps
            && [...token].every(
              (char: string) => (
                this.charset.includes(char)
              )
            );
        }
      }

      export namespace MinMaxRepeatedChar {
        export class NRepeatedChar extends MinMaxRepeatedChar {
          constructor(
            reps: number,
            ...charsets: Array<RepeatedCharInput>
          ) {
            super(reps, reps, ...charsets);
          }

          get reps() {
            return this.minReps;
          }
        }

        export namespace NRepeatedChar {
          export class OneRepeatedChar extends NRepeatedChar {
            constructor(
              ...charsets: Array<RepeatedCharInput>
            ) {
              super(1, ...charsets);
            }
          }
        }
      }
    }
  }

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

module.exports = _Validation;

/// <reference path="Validation.ts" />
namespace Validation {
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
      const Numbers = importModule("./system/numbers/RealNumber.ts");


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
}

module.exports = Validation.Pattern;

class Strings {

  static get StringSplitter(): typeof StringSplitter {
    return importModule("StringSplitter");
  }

  static get ValidString(): typeof ValidString {
    return importModule("ValidString");
  }

  static get CharStrings(): typeof CharStrings {
    return Strings.ValidString.CharStrings;
  }

  static get OneCharString(): typeof OneCharString {
    return Strings.CharStrings.OneCharString;
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    return Strings.OneCharString.NRepeatCharString;
  }

  static get RepeatCharString(): typeof RepeatCharString {
    return Strings.NRepeatCharString.RepeatCharString;
  }

  static get Chars(): typeof Chars {
    return Strings.CharStrings.Chars;
  }

  static get Char(): typeof Char {
    return Strings.Chars.Char;
  }

  static get UrlChar(): typeof UrlChar {
    return Strings.Chars.UrlChar;
  }

  static get Words(): typeof Words {
    return Strings.ValidString.Words;
  }

  static get OneGram(): typeof OneGram {
    return Strings.Words.OneGram;
  }

  static get NGram(): typeof NGram {
    return Strings.OneGram.NGram;
  }

}

namespace Strings {
  // typed primitives
  /// string
  //// stringful
  export type stringful = stringful.stringful<string>;
  export namespace stringful {
    export type stringful<S extends string> = S extends "" ? never : S;
  }
  export function stringful<S extends string>(string: stringful.stringful<S>) {
    return string;
  }

  //// dotless
  export type dotless = dotless.dotless<string>;
  export namespace dotless {
    export type dotless<S extends string> =
      S extends `${string}.${string}` ?
      never
      : S;
  }
  export function dotless<S extends string>(string: dotless.dotless<S>) {
    return string;
  }

  export const dt: dotless = dotless("");

  //// char
  export type char = char.char<string>;
  export namespace char {
    export type char<S extends string> =
      S extends `${string}${string}` ?
      never
      : S;
  }
  export function char<S extends string>(string: char.char<S>) {
    return string;
  }



}

module.exports = Strings;

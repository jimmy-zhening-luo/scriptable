class Types {

  static get Numbers(): typeof Numbers {
    return importModule("numbers/Numbers");
  }

  static get Strings(): typeof Strings {
    return importModule("strings/Strings");
  }

}

namespace Types {

  // true primitives
  export type primitive = string | number | boolean;

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
      S extends `${string}.${string}`?
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


  //// charless

}

module.exports = Types;

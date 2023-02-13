class Types {

  static get Numbers(): typeof Numbers {
    return importModule("numbers/Numbers");
  }

  static get Strings(): typeof Strings {
    return importModule("strings/Strings");
  }

}

namespace Types {

  export type primitive = string | number | boolean;

  export type stringful = Exclude<string, "">;

}

module.exports = Types;

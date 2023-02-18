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

}

module.exports = Types;

class Types {
  static get Numbers(): typeof Numbers {
    return importModule("numbers/Numbers");
  }

  static get Strings(): typeof Strings {
    return importModule("strings/Strings");
  }
}

module.exports = Types;

class Types {
  public static get Strings(): typeof Strings {
    try {
      return importModule("strings/Strings") as typeof Strings;
    }
    catch (e) {
      throw new ReferenceError("Types: import Strings");
    }
  }
}

module.exports = Types;

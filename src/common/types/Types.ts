class Types {
  public static get Dates(): typeof Dates {
    try {
      return importModule("dates/Dates") as typeof Dates;
    }
    catch (e) {
      throw new ReferenceError("Types: error importing Dates module");
    }
  }

  public static get Strings(): typeof Strings {
    try {
      return importModule("strings/Strings") as typeof Strings;
    }
    catch (e) {
      throw new ReferenceError("Types: error importing Strings module");
    }
  }
}

module.exports = Types;

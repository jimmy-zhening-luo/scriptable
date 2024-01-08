class Dates {
  public static get DateTime(): typeof DateTime {
    return importModule("./datetime/DateTime") as typeof DateTime;
  }
}

module.exports = Dates;

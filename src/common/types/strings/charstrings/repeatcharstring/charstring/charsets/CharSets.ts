class CharSets {
  public static get UrlCharSet(): typeof UrlCharSet {
    try {
      return importModule("UrlCharSet") as typeof UrlCharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `CharSets: import UrlCharSet: \n${e as string}`,
      );
    }
  }

  public static get CharSet(): typeof CharSet {
    try {
      return CharSets.UrlCharSet.CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `CharSets: import CharSet: \n${e as string}`,
      );
    }
  }
}

module.exports = CharSets;

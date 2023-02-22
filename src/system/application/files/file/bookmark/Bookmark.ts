class Bookmark {

  readonly _nominalType: string = "Bookmark";
  readonly bookmark: string;
  readonly path: string;

  constructor(
    bookmark: string = ""
  ) {
    try {
      this.bookmark = bookmark.trim();
      this.path = this.bookmark === "" ?
        ""
        : FileManager.iCloud().bookmarkExists(bookmark) ?
          FileManager.iCloud().bookmarkedPath(bookmark)
          : "";
    } catch (e) {
      console.error(`Bookmark: Unhandled exception creating bookmark: ${e}`);
      throw e;
    }
  }

  toString(): string {
    return this.path;
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return (
      instance !== null
      && instance !== undefined
      && typeof instance === "object"
      && "_nominalType" in instance
      && instance._nominalType === "Bookmark"
    );
  }

}

module.exports = Bookmark;

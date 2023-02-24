class Bookmark {

  readonly _nominalType: string = "Bookmark";
  readonly bookmark: string;

  constructor(
    bookmark: string = ""
  ) {
    this.bookmark = bookmark.trim();
  }

  get exists(): boolean {
    try {
      return this.bookmark !== "" && Bookmark.Manager.bookmarkExists(this.bookmark);
    } catch (e) {
      console.error(`Bookmark: exists: Caught unhandled exception while using Scriptable FileManager class to check whether bookmark exists. See unhandled exception: ${e}`);
      throw e;
    }
  }

  get path(): string {
    try {
      if (!this.exists) {
        if (this.bookmark === "")
          throw new ReferenceError("Bookmark name cannot be empty.");
        else
          throw new ReferenceError(
            `Bookmark '${this.bookmark}' does not exist in Scriptable. Check your bookmark name and make sure that bookmark is created in Scriptable.`
          );
      } else {
        return Bookmark.Manager.bookmarkedPath(this.bookmark);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError))
        e = new Error(
          `Caught unhandled exception while using Scriptable FileManager class to get bookmarked path of the bookmark named '${this.bookmark}'. See unhandled exception: ${e}`
        );
      console.error(`Bookmark: path: Error getting bookmarked path: ${e}`);
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

  static get Manager(): FileManager {
    return FileManager.iCloud();
  }

}

module.exports = Bookmark;

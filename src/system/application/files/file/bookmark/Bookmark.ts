class Bookmark {
  readonly _nominalType: string = "Bookmark";
  readonly bookmark: string;

  constructor(bookmark: string = "") {
    try {
      this.bookmark = bookmark.trim();
    } catch (e) {
      throw new SyntaxError(
        `Bookmark: constructor: Caught unhandled exception while instantiating Bookmark. See unhandled exception: \n${e}`,
      );
    }
  }

  get exists(): boolean {
    try {
      return (
        this.bookmark !== "" && Bookmark.Manager.bookmarkExists(this.bookmark)
      );
    } catch (e) {
      throw new ReferenceError(
        `Bookmark: exists: Caught unhandled exception while using Scriptable FileManager class to check whether bookmark exists. See unhandled exception: \n${e}`,
      );
    }
  }

  get path(): string {
    try {
      if (!this.exists) {
        if (this.bookmark === "")
          throw new ReferenceError("Bookmark name cannot be empty.");
        else
          throw new ReferenceError(
            `Bookmark '${this.bookmark}' does not exist in Scriptable. Check your bookmark name and make sure that bookmark is created in Scriptable.`,
          );
      } else {
        return Bookmark.Manager.bookmarkedPath(this.bookmark);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError))
        e = new Error(
          `Caught unhandled exception while using Scriptable FileManager class to get bookmarked path of the bookmark named '${this.bookmark}'. See unhandled exception: \n${e}`,
        );
      throw new ReferenceError(
        `Bookmark: path: Error getting bookmarked path: \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.path;
    } catch (e) {
      throw new EvalError(
        `Bookmark: toString: Caught unhandled exception while getting bookmarked path of the bookmark named '${this.bookmark}'. See unhandled exception: \n${e}`,
      );
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null &&
        instance !== undefined &&
        typeof instance === "object" &&
        "_nominalType" in instance &&
        (instance as Bookmark)._nominalType === "Bookmark"
      );
    } catch (e) {
      throw new EvalError(
        `Bookmark: [Symbol.hasInstance]: Caught unhandled exception while checking whether instance is an instance of Bookmark. See unhandled exception: \n${e}`,
      );
    }
  }

  static get Manager(): FileManager {
    try {
      return FileManager.iCloud();
    } catch (e) {
      throw new ReferenceError(
        `Bookmark: Manager: Caught unhandled exception while getting Scriptable FileManager.iCloud() instance. See unhandled exception: \n${e}`,
      );
    }
  }
}

module.exports = Bookmark;

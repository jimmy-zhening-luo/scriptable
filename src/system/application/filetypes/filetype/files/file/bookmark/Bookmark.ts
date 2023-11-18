class Bookmark {
  readonly _nominalType: string = "Bookmark";
  readonly alias: string;

  constructor(bookmark: string = "") {
    try {
      this.alias = bookmark.trim();
    }
    catch (e) {
      throw new SyntaxError(
        `Bookmark: constructor: Caught unhandled exception while instantiating Bookmark. See unhandled exception: \n${e}`,
      );
    }
  }

  get resolves(): boolean {
    try {
      return (
        this.alias !== "" && FileManager.iCloud()
          .bookmarkExists(this.alias)
      );
    }
    catch (e) {
      throw new ReferenceError(
        `Bookmark: exists: Caught unhandled exception while using Scriptable FileManager class to check whether bookmark exists. See unhandled exception: \n${e}`,
      );
    }
  }

  get path(): string {
    try {
      if (!this.resolves) {
        if (this.alias === "")
          throw new ReferenceError("Bookmark name cannot be empty.");
        else
          throw new ReferenceError(
            `Bookmark '${this.alias}' is not configured in Scriptable.`,
          );
      }
      else {
        return FileManager.iCloud()
          .bookmarkedPath(this.alias);
      }
    }
    catch (e) {
      throw new ReferenceError(
        `Bookmark: path: Error getting bookmarked path: \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.path;
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: toString: Caught unhandled exception while getting bookmarked path of the bookmark named '${this.alias}'. See unhandled exception: \n${e}`,
      );
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null
        && instance !== undefined
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as Bookmark)._nominalType === "Bookmark"
      );
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: [Symbol.hasInstance]: Caught unhandled exception while checking whether instance is an instance of Bookmark. See unhandled exception: \n${e}`,
      );
    }
  }
}

module.exports = Bookmark;

class Bookmark {
  public readonly _nominalType: string = "Bookmark";
  public readonly alias: string;
  public readonly path: string;

  constructor(bookmark: string | Bookmark) {
    try {
      if (bookmark instanceof Bookmark) {
        this.alias = bookmark.alias;

        this.path = bookmark.path;
      }
      else {
        const alias: string = bookmark.trim();

        if (alias === "")
          throw new SyntaxError(
            `expected bookmark name; instead, got empty string: '${alias}'`,
          );
        else if (
          !FileManager
            .iCloud()
            .bookmarkExists(alias)
        )
          throw new ReferenceError(
            `no bookmark exists in Scriptable with alias: '${alias}'`,
          );
        else {
          this.alias = alias;

          this.path = FileManager
            .iCloud()
            .bookmarkedPath(alias);

          if (this.path === "")
            throw new ReferenceError(
              `Unexpected: bookmark with alias '${alias}' resolved to empty path even though it exists in Scriptable`,
            );
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: ctor`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && "_nominalType" in instance
        && instance._nominalType === "Bookmark"
      );
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this.path;
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = Bookmark;

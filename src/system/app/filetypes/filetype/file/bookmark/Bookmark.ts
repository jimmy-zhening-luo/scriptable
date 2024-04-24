class Bookmark {
  public readonly name: string = "Bookmark";
  public readonly alias: stringful;
  public readonly path: stringful;

  constructor(bookmark: string | Bookmark) {
    try {
      if (bookmark instanceof Bookmark) {
        this.alias = bookmark.alias;
        this.path = bookmark.path;
      }
      else {
        const alias: string = bookmark.trim();

        if (alias.length === 0)
          throw new TypeError(
            `empty bookmark alias`,
          );
        else if (
          !FileManager
            .iCloud()
            .bookmarkExists(alias)
        )
          throw new ReferenceError(
            `no Scriptable bookmark with alias: '${alias}'`,
          );
        else {
          this.alias = alias as stringful;

          const path: string = FileManager
            .iCloud()
            .bookmarkedPath(alias);

          if (path.length === 0)
            throw new ReferenceError(
              `Unexpected: bookmark with alias '${alias}' resolved to empty path even though the bookmark exists in Scriptable`,
            );
          else
            this.path === path as stringful;
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
        && "name" in instance
        && instance.name === "Bookmark"
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

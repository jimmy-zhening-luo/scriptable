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
            `empty alias`,
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
          this.alias = alias;
          this.path = FileManager
            .iCloud()
            .bookmarkedPath(alias);
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: ctor: \n${e as string}`,
      );
    }
  }

  public static [Symbol.hasInstance](instance: any): boolean {
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
        `Bookmark: [Symbol.hasInstance]: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.path;
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: toString: \n${e as string}`,
      );
    }
  }
}

module.exports = Bookmark;

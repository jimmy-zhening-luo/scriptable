class Bookmark {
  public readonly alias: alias;
  public readonly path: rootpath.toString;

  constructor(bookmark: string) {
    try {
      const alias = bookmark.trim();

      if (alias.length < 1)
        throw new TypeError(`Bookmark alias is empty`);
      else if (!FileManager.local().bookmarkExists(alias as stringful))
        throw new ReferenceError(`Bookmark not found`);
      else {
        this.alias = alias as alias;
        this.path = FileManager.local().bookmarkedPath(this.alias) as typeof this.path;
      }
    }
    catch (e) {
      throw new Error(
        `Bookmark: "${bookmark}"`,
        { cause: e },
      );
    }
  }
}

module.exports = Bookmark;

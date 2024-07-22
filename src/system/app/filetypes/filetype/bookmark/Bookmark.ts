class Bookmark {
  public readonly alias: Alias;
  public readonly path: Stringify<Filepath<1>>;

  constructor(bookmark: string) {
    try {
      const alias = bookmark.trim();

      if (alias.length < 1)
        throw new SyntaxError(`Bookmark alias is empty`);
      else if (
        !FileManager.local().bookmarkExists(alias as stringful)
      )
        throw new ReferenceError(
          `Bookmark does not exist`,
          { cause: alias },
        );
      else {
        this.alias = alias as Alias;
        this.path = FileManager.local().bookmarkedPath(bookmark) as Stringify<Filepath<1>>;
      }
    }
    catch (e) {
      throw new Error(
        `Bookmark`,
        { cause: e },
      );
    }
  }
}

module.exports = Bookmark;

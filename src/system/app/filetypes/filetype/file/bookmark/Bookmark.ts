function bookmark(bookmark: string) {
  try {
    const alias = bookmark.trim(),
    manager = FileManager.local();

    if (alias.length < 1)
      throw new TypeError(`Bookmark alias is empty`);
    else if (!manager.bookmarkExists(alias))
      throw new ReferenceError(`Bookmark not found`);
    else
      return manager.bookmarkedPath(alias) as rootpath.toString;
  }
  catch (e) {
    throw new Error(
      `bookmark: "${bookmark}"`,
      { cause: e },
    );
  }
}

module.exports = bookmark;

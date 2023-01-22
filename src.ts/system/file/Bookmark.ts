class Bookmark {
  readonly bookmark: string;
  readonly path: string = String();
  
  constructor (
    bookmark: string = String()
  ) {
    this.bookmark = bookmark;
    this.path = (bookmark === String())?
      String()
      :FileManager.iCloud().bookmarkedPath(bookmark);
  }
  
  toString(): string {
    return this.path;
  }
}

module.exports = Bookmark;

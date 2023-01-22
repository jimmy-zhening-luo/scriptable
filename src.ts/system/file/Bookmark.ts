class Bookmark {
  readonly bookmark: string;
  readonly path: string = String();
  
  constructor (
    bookmark: string
  ) {
    this.bookmark = bookmark;
    this.path = (bookmark === String())?
      String()
      :FileManager.iCloud().bookmarkedPath(bookmark) as string;
  }
  
  toString(): String {
    return this.path;
  }
}

module.exports = Bookmark;

module.exports = class {
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
  
  toString(): string {
    return this.path;
  }
}

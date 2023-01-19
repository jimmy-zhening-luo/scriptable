class Bookmark {
  #bookmark = String();
  #path = String();
  constructor (
    bookmark = String()
  ) {
    this.#bookmark = (
      (bookmark?.constructor === String)?
        bookmark
        :String()
      ) ?? String();
    this.#path = (
      (this.#bookmark === String())?
        String()
        :(
          FileManager
          .iCloud()
          .bookmarkedPath(
            bookmark
          )
          ?? String()
        )
      ) ?? String();
  }
  
  get bookmark() {
    return this.#bookmark ?? String();
  }
  
  get path() {
    return this.#path ?? String();
  }
  
  toString() {
    return this.path ?? String();
  }
}

module.exports = Bookmark;

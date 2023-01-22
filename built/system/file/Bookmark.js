"use strict";
class Bookmark {
    constructor(bookmark) {
        this.path = String();
        this.bookmark = bookmark;
        this.path = (bookmark === String()) ?
            String()
            : FileManager.iCloud().bookmarkedPath(bookmark);
    }
    toString() {
        return this.path;
    }
}
module.exports = Bookmark;

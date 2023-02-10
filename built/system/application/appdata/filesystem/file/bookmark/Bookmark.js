class Bookmark {
    constructor(bookmark = String()) {
        this.bookmark = bookmark.trim();
        this.path = this.bookmark === String() ?
            String()
            : FileManager.iCloud()
                .bookmarkedPath(bookmark);
    }
    toString() {
        return this.path;
    }
}
module.exports = Bookmark;
//# sourceMappingURL=Bookmark.js.map
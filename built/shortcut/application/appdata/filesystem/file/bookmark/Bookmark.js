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
//# sourceMappingURL=Bookmark.js.map
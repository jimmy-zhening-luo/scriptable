// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
var Search;
(function (Search_1) {
    const shortcut = importModule("shortcut/Shortcut");
    class Search extends shortcut {
        runtime() {
            return false;
        }
    }
    Search_1.Search = Search;
})(Search || (Search = {}));
(new Search.Search())["run"]();
//# sourceMappingURL=Search.js.map
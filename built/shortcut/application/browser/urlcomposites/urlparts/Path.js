const pa_UrlPart = importModule("urlpart/UrlPart");
class Path extends pa_UrlPart {
    parse(path) {
        path = path.trim();
        while (path.startsWith("/"))
            path = path.slice(1);
        while (path.endsWith("/"))
            path = path.slice(0, -1);
        return path
            .split("/")
            .map(pathRepeater => new Path._PathRepeater(pathRepeater))
            .every(pathRepeater => pathRepeater.isValid) ?
            path
            : "";
    }
}
(function (Path) {
    Path._PathRepeater = importModule("repeater/PathRepeater");
})(Path || (Path = {}));
module.exports = Path;
//# sourceMappingURL=Path.js.map
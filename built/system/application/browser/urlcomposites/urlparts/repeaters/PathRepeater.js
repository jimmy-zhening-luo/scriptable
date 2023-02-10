const pa_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class PathRepeater extends pa_UrlPartRepeater {
    parse(repeater) {
        return new PathRepeater._ValidPathRepeater(repeater).value;
    }
}
(function (PathRepeater) {
    PathRepeater._ValidPathRepeater = importModule("./system/application/browser/urlcomposites/urlparts/validators/ValidPathRepeater");
})(PathRepeater || (PathRepeater = {}));
module.exports = PathRepeater;
//# sourceMappingURL=PathRepeater.js.map
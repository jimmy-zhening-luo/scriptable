const qu_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class QueryRepeater extends qu_UrlPartRepeater {
    parse(repeater) {
        return new QueryRepeater._ValidQueryRepeater(repeater).value;
    }
}
(function (QueryRepeater) {
    QueryRepeater._ValidQueryRepeater = importModule("./shortcut/application/browser/urlcomposites/urlparts/validators/ValidQueryRepeater");
})(QueryRepeater || (QueryRepeater = {}));
module.exports = QueryRepeater;
//# sourceMappingURL=QueryRepeater.js.map
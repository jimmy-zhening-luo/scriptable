const qu_UrlPart = importModule("urlpart/UrlPart");
class Query extends qu_UrlPart {
    parse(query) {
        query = query.trim();
        query = query.startsWith("?") ? query.slice(1) : query;
        return this
            .mapToQueryString(this.queryStringToMap(query))
            .split("&")
            .map(keyValueString => new Query._QueryRepeater(keyValueString))
            .filter(queryRepeater => queryRepeater.isValid)
            .map(queryRepeater => queryRepeater.toString())
            .join("&");
    }
    get params() {
        return this.queryStringToMap(this.toString());
    }
    addParam(_keyOrKeyValue, _value) {
        var _a, _b;
        const params = this.params;
        const key = Array.isArray(_keyOrKeyValue) ?
            (_a = _keyOrKeyValue[0]) !== null && _a !== void 0 ? _a : ""
            : _keyOrKeyValue;
        const value = Array.isArray(_keyOrKeyValue) ?
            (_b = _keyOrKeyValue[1]) !== null && _b !== void 0 ? _b : ""
            : _value !== null && _value !== void 0 ? _value : "";
        if (key !== "")
            value === "" ?
                params.delete(key)
                : params.set(key, value);
        return new Query(this.mapToQueryString(params));
    }
    removeParam(key) {
        return this.addParam(key, "");
    }
    queryStringToMap(query) {
        const queryEntries = query
            .split("&")
            .map(keyValueString => keyValueString.split("="))
            .map(keyValueTuple => {
            var _a;
            return [
                (_a = keyValueTuple.slice(0, 1).shift()) !== null && _a !== void 0 ? _a : "",
                keyValueTuple.slice(1).join("=")
            ];
        });
        const nullabeQueryMap = new Map(queryEntries);
        nullabeQueryMap.delete("");
        for (const key of nullabeQueryMap.keys())
            if (nullabeQueryMap.get(key) === undefined
                || nullabeQueryMap.get(key) === null
                || nullabeQueryMap.get(key) === "")
                nullabeQueryMap.delete(key);
        const queryMap = nullabeQueryMap;
        return queryMap;
    }
    mapToQueryString(queryMap) {
        return Array.from(queryMap.entries())
            .map(keyValueTuple => keyValueTuple.join("="))
            .join("&");
    }
}
(function (Query) {
    Query._QueryRepeater = importModule("repeater/QueryRepeater");
})(Query || (Query = {}));
module.exports = Query;
//# sourceMappingURL=Query.js.map
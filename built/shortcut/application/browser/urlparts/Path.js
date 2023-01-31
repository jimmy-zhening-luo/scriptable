// WIP
class Path extends UrlPart {
    constructor(path) {
        super(path);
    }
    parse(path) {
        return path;
    }
}
// WIP
class Query extends UrlPart {
    constructor(query) {
        super(query);
        this.params = new Array();
    }
    static get QueryParam() {
        return importModule("query/QueryParam");
    }
    parse(query) {
        return query;
    }
    static fromObjectEntries() {
    }
    static fromQueryString() {
    }
}
//# sourceMappingURL=Path.js.map
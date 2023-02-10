const pq_UrlComposite = importModule("urlcomposite/UrlComposite");
class PathQuery extends pq_UrlComposite {
    constructor(pathOrPathQuery, query) {
        super();
        this.parts = pathOrPathQuery === undefined ?
            [
                new PathQuery._Path(),
                new PathQuery._Query()
            ]
            : pathOrPathQuery instanceof PathQuery ?
                pathOrPathQuery.parts
                : [
                    new PathQuery._Path(pathOrPathQuery),
                    new PathQuery._Query(query)
                ];
        this.path = this.parts[0];
        this.query = this.parts[1];
    }
    get composite() {
        return this.query.isValid ?
            [
                this.path.toString(),
                this.query.toString()
            ].join("?")
            : this.path.toString();
    }
}
(function (PathQuery) {
    PathQuery._Path = importModule("urlparts/Path");
    PathQuery._Query = importModule("urlparts/Query");
})(PathQuery || (PathQuery = {}));
module.exports = PathQuery;
//# sourceMappingURL=PathQuery.js.map
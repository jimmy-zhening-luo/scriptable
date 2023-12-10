"use strict";
const pq_UrlComposite = importModule("urlcomposite/UrlComposite");
class PathQuery extends pq_UrlComposite {
    constructor(pathOrPathQuery, query) {
        try {
            super();
            this.parts
                = pathOrPathQuery === undefined
                    ? [
                        new PathQuery.Path(),
                        new PathQuery.Query(),
                    ]
                    : pathOrPathQuery instanceof PathQuery
                        ? pathOrPathQuery.parts
                        : [
                            new PathQuery.Path(pathOrPathQuery),
                            new PathQuery.Query(query),
                        ];
            this.path = this.parts[0];
            this.query = this.parts[1];
        }
        catch (e) {
            throw new SyntaxError(`PathQuery: constructor: error creating PathQuery: \n${e}`);
        }
    }
    static get Path() {
        try {
            return this.UrlParts.Path;
        }
        catch (e) {
            throw new ReferenceError(`PathQuery: get Path: error loading Path module: \n${e}`);
        }
    }
    static get Query() {
        try {
            return this.UrlParts.Query;
        }
        catch (e) {
            throw new ReferenceError(`PathQuery: get Query: error loading Query module: \n${e}`);
        }
    }
    static get UrlComposite() {
        try {
            return pq_UrlComposite;
        }
        catch (e) {
            throw new ReferenceError(`PathQuery: get UrlComposite: error loading UrlComposite module: \n${e}`);
        }
    }
    get composite() {
        try {
            return this.query.isValid
                ? [
                    this.path.toString(),
                    this.query.toString(),
                ].join("?")
                : this.path.toString();
        }
        catch (e) {
            throw new EvalError(`PathQuery: get composite: error getting composite: \n${e}`);
        }
    }
}
module.exports = PathQuery;

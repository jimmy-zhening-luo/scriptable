declare class QueryRepeater {
    readonly key: string;
    readonly value: string;
    constructor();
    constructor(param: QueryRepeater);
    constructor(param: QueryRepeater.QueryTuple);
    constructor(param: QueryRepeater.QueryParamObject);
    constructor(param: QueryRepeater.QueryObjectEntry);
    constructor(queryStringSegment: string);
    constructor(key: string, value: string);
}
declare namespace QueryRepeater {
    type QueryTuple = [
        key: string,
        value: string
    ];
    type QueryParamObject = {
        key: string;
        value: string;
    };
    type QueryObjectEntry = QueryTuple;
}
//# sourceMappingURL=QueryRepeater.d.ts.map
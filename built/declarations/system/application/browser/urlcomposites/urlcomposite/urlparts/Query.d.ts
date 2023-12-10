declare const qu_UrlPart: typeof UrlPart;
declare class Query extends qu_UrlPart {
    constructor(query?: string | Query | Map<string, string> | Record<string, string> | [string, string] | Array<[string, string]>);
    static get QueryRepeater(): typeof QueryRepeater;
    static get UrlPart(): typeof UrlPart;
    get query(): string;
    get queryString(): string;
    get queryTuples(): Array<[string, string]>;
    get queryMap(): Map<string, string>;
    static queryStringToTuples(query: string): Array<[string, string]>;
    static tuplesToMap(tuples: Array<[string, string]>): Map<string, string>;
    static queryStringToMap(query: string): Map<string, string>;
    static mapToTuples(record: Map<string, string> | Record<string, string>): Array<[string, string]>;
    static tuplesToQueryString(tuples: Array<[string, string]>): string;
    static mapToQueryString(record: Map<string, string> | Record<string, string>): string;
    hasParam(key: string): boolean;
    getParam(key: string): string;
    addParam(_keyOrKeyValue: ConstructorParameters<typeof Query>[0], _value?: string): Query;
    deleteParam(keys: string | string[]): Query;
    toTuples(): typeof Query.prototype.queryTuples;
    toMap(): typeof Query.prototype.queryMap;
    protected parse(query: string): null | string;
}
//# sourceMappingURL=Query.d.ts.map
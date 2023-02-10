declare const qu_UrlPart: typeof UrlPart;
declare class Query extends qu_UrlPart {
    protected parse(query: string): null | string;
    get params(): Map<string, string>;
    addParam(_keyOrKeyValue: string | [string, string], _value?: string): Query;
    deleteParam(key: string): Query;
    protected queryStringToMap(query: string): Map<string, string>;
    protected mapToQueryString(queryMap: Map<string, string>): string;
}
declare namespace Query {
    const _QueryRepeater: typeof QueryRepeater;
}
//# sourceMappingURL=Query.d.ts.map
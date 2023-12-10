declare const qu_UrlPartRepeater: typeof UrlPartRepeater;
declare class QueryRepeater extends qu_UrlPartRepeater {
    static get ValidQueryRepeater(): typeof ValidQueryRepeater;
    static get UrlPartRepeater(): typeof UrlPartRepeater;
    protected parse(repeater: string): null | string;
}
//# sourceMappingURL=QueryRepeater.d.ts.map
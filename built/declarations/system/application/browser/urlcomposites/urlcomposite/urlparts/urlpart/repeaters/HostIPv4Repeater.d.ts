declare const hipf_UrlPartRepeater: typeof UrlPartRepeater;
declare class HostIPv4Repeater extends hipf_UrlPartRepeater {
    static get ValidHostIPv4Repeater(): typeof ValidHostIPv4Repeater;
    static get UrlPartRepeater(): typeof UrlPartRepeater;
    protected parse(repeater: string): null | string;
}
//# sourceMappingURL=HostIPv4Repeater.d.ts.map
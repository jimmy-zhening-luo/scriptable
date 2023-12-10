declare const hips_UrlPartRepeater: typeof UrlPartRepeater;
declare class HostIPv6Repeater extends hips_UrlPartRepeater {
    static get ValidHostIPv6Repeater(): typeof ValidHostIPv6Repeater;
    static get UrlPartRepeater(): typeof UrlPartRepeater;
    protected parse(repeater: string): null | string;
}
//# sourceMappingURL=HostIPv6Repeater.d.ts.map
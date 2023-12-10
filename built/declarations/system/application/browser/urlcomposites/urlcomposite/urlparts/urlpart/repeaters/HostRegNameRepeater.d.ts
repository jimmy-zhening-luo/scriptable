declare const hrn_UrlPartRepeater: typeof UrlPartRepeater;
declare class HostRegNameRepeater extends hrn_UrlPartRepeater {
    static get ValidHostRegNameRepeater(): typeof ValidHostRegNameRepeater;
    static get UrlPartRepeater(): typeof UrlPartRepeater;
    protected parse(repeater: string): null | string;
}
//# sourceMappingURL=HostRegNameRepeater.d.ts.map
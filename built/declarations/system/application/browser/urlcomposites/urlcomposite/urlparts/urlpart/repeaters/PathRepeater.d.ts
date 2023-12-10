declare const pa_UrlPartRepeater: typeof UrlPartRepeater;
declare class PathRepeater extends pa_UrlPartRepeater {
    static get ValidPathRepeater(): typeof ValidPathRepeater;
    static get UrlPartRepeater(): typeof UrlPartRepeater;
    protected parse(repeater: string): null | string;
}
//# sourceMappingURL=PathRepeater.d.ts.map
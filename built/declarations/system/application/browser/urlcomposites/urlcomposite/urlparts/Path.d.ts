declare const pa_UrlPart: typeof UrlPart;
declare class Path extends pa_UrlPart {
    constructor(path?: string | Path);
    static get PathRepeater(): typeof PathRepeater;
    static get UrlPart(): typeof UrlPart;
    static get StringSplitter(): typeof StringSplitter;
    append(subpath: string | Path): Path;
    protected parse(path: string): null | string;
}
//# sourceMappingURL=Path.d.ts.map
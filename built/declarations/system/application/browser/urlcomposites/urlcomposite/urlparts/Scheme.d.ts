declare const sc_UrlPart: typeof UrlPart;
declare class Scheme extends sc_UrlPart {
    constructor(scheme?: string | Scheme);
    static get ValidScheme(): typeof ValidScheme;
    static get UrlPart(): typeof UrlPart;
    protected parse(scheme: string): null | string;
}
//# sourceMappingURL=Scheme.d.ts.map
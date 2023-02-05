declare const sc_UrlPart: typeof UrlPart;
declare class Scheme extends sc_UrlPart {
    constructor(scheme?: string | Scheme);
    protected parse(scheme: string): null | string;
}
declare namespace Scheme {
    const _ValidScheme: typeof ValidScheme;
}
//# sourceMappingURL=Scheme.d.ts.map
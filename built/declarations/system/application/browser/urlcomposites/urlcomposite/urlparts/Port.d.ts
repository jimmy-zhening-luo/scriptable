declare const po_UrlPart: typeof UrlPart;
declare class Port extends po_UrlPart {
    constructor(port?: string | number | Port);
    static get ValidPort(): typeof ValidPort;
    static get UrlPart(): typeof UrlPart;
    toNumber(coerceEmptyPortToZero?: boolean): number;
    protected parse(port: string): null | string;
}
//# sourceMappingURL=Port.d.ts.map
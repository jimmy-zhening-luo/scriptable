declare const po_UrlPart: typeof UrlPart;
declare class Port extends po_UrlPart {
    constructor(port?: string | number | Port);
    protected parse(port: string): null | string;
    get number(): number;
    toNumber(coerceEmptyPortToNull?: boolean): null | number;
}
declare namespace Port {
    const _ValidPort: typeof ValidPort;
}
//# sourceMappingURL=Port.d.ts.map
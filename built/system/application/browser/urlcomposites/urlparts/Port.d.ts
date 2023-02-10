declare const po_UrlPart: typeof UrlPart;
declare class Port extends po_UrlPart {
    constructor(port?: null | string | number | Port);
    protected parse(port: string): null | string;
    toNumber(coerceEmptyPortToZero?: boolean): number;
}
declare namespace Port {
    const _ValidPort: typeof ValidPort;
}
//# sourceMappingURL=Port.d.ts.map
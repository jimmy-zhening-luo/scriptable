declare class Port extends UrlPart {
    constructor(port?: string | number | Port);
    protected parse(port: string): string;
    get number(): number;
    toNumber(coerceEmptyPortToNull?: boolean): null | number;
}
//# sourceMappingURL=Port.d.ts.map
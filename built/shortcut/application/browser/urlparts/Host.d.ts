declare class Host extends UrlPart {
    constructor(host?: string | Host);
    static get IP(): any;
    static get IPv4(): any;
    static get IPv6(): any;
    static get RegName(): any;
    protected parse(host: any): string;
    protected parseIP(host: any): string;
    protected parseIPv4(host: any): string;
    protected parseIPv6(host: any): string;
    protected parseRegName(host: any): string;
}
//# sourceMappingURL=Host.d.ts.map
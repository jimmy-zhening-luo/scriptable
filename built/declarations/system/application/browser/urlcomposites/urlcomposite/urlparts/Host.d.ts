declare const ho_UrlPart: typeof UrlPart;
declare class Host extends ho_UrlPart {
    constructor(host?: string | Host);
    static get HostIPv4Repeater(): typeof HostIPv4Repeater;
    static get HostIPv6Repeater(): typeof HostIPv6Repeater;
    static get HostRegNameRepeater(): typeof HostRegNameRepeater;
    static get UrlPart(): typeof UrlPart;
    protected parse(host: string): null | string;
}
//# sourceMappingURL=Host.d.ts.map
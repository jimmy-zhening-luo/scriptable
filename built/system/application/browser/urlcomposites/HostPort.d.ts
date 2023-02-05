declare const hp_UrlComposite: typeof UrlComposite;
declare class HostPort extends hp_UrlComposite {
    readonly parts: [Host, Port];
    readonly host: Host;
    readonly port: Port;
    constructor(hostPort?: HostPort);
    constructor(host?: string | Host, port?: string | number | Port);
    get composite(): string;
}
declare namespace HostPort {
    const _Host: typeof Host;
    const _Port: typeof Port;
}
//# sourceMappingURL=HostPort.d.ts.map
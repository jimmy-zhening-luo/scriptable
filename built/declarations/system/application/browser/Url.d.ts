declare class Url {
    private _scheme;
    private _host;
    private _port;
    private _path;
    private _query;
    private _fragment;
    constructor(headUrl?: string | Scheme | Url | Url.UrlRecords, host?: ConstructorParameters<typeof Host>[0], port?: ConstructorParameters<typeof Port>[0], path?: ConstructorParameters<typeof Path>[0], query?: ConstructorParameters<typeof Query>[0], fragment?: ConstructorParameters<typeof Fragment>[0]);
    static get UrlComposites(): typeof UrlComposites;
    static get UrlParts(): typeof UrlParts;
    static get UrlPart(): typeof UrlPart;
    static get Scheme(): typeof Scheme;
    static get Host(): typeof Host;
    static get Port(): typeof Port;
    static get Path(): typeof Path;
    static get Query(): typeof Query;
    static get Fragment(): typeof Fragment;
    private static get SchemeHostPortPathQueryFragment();
    get isValid(): boolean;
    get url(): string;
    get scheme(): string;
    get host(): string;
    get port(): string;
    get path(): string;
    get query(): typeof Query.prototype.query;
    get queryString(): typeof Query.prototype.queryString;
    get queryTuples(): typeof Query.prototype.queryTuples;
    get queryMap(): typeof Query.prototype.queryMap;
    get fragment(): string;
    set url(url: string | Url | Url.UrlRecords);
    set scheme(scheme: ConstructorParameters<typeof Scheme>[0]);
    set host(host: ConstructorParameters<typeof Host>[0]);
    set port(port: ConstructorParameters<typeof Port>[0]);
    set path(path: ConstructorParameters<typeof Path>[0]);
    set query(query: ConstructorParameters<typeof Query>[0]);
    set fragment(fragment: ConstructorParameters<typeof Fragment>[0]);
    static encode(url: string): string;
    static decode(url: string): string;
    static encodePart(part: string): string;
    static decodePart(part: string): string;
    append(...path: Parameters<Path["append"]>): this;
    hasParam(...key: Parameters<Query["hasParam"]>): boolean;
    getParam(...key: Parameters<Query["getParam"]>): string;
    addParam(...params: Parameters<Query["addParam"]>): this;
    deleteParam(...keys: Parameters<Query["deleteParam"]>): this;
    open(): this;
    webview(fullScreen?: boolean): Promise<this>;
    xCallback(): Promise<any>;
    toString(): string;
    private _parse;
}
declare namespace Url {
    interface UrlRecords {
        scheme?: ConstructorParameters<typeof Scheme>[0];
        host?: ConstructorParameters<typeof Host>[0];
        port?: ConstructorParameters<typeof Port>[0];
        path?: ConstructorParameters<typeof Path>[0];
        query?: ConstructorParameters<typeof Query>[0];
        fragment?: ConstructorParameters<typeof Fragment>[0];
    }
}
//# sourceMappingURL=Url.d.ts.map
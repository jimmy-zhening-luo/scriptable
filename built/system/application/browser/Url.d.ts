declare class Url {
    #private;
    constructor(url?: Url);
    constructor(urlparts?: Url.UrlParts);
    constructor(url?: string);
    constructor(scheme?: Scheme | string, host?: Host | string, port?: Port | number | string, path?: Path | string, query?: Query | string, fragment?: Fragment | string);
    get scheme(): string;
    set scheme(scheme: (string | Scheme | undefined));
    get host(): string;
    set host(host: (string | Host | undefined));
    get port(): string;
    set port(port: (string | number | Port | undefined));
    get path(): string;
    set path(path: (string | Path | undefined));
    get query(): string;
    set query(query: (string | Query | undefined));
    addQueryParam(keyOrKeyValue: string | [string, string], value?: string): void;
    removeQueryParam(key: string): void;
    get fragment(): string;
    set fragment(fragment: (string | Fragment | undefined));
    get string(): string;
    toString(): string;
    static encode(url: string): string;
    static decode(url: string): string;
    static encodePart(part: string): string;
    static decodePart(part: string): string;
}
declare namespace Url {
    interface UrlParts {
        scheme?: string | Scheme;
        host?: string | Host;
        port?: string | number | Port;
        path?: string | Path;
        query?: string | Query;
        fragment?: string | Fragment;
    }
    const _File: typeof File;
    const _Scheme: typeof Scheme;
    const _Host: typeof Host;
    const _Port: typeof Port;
    const _Path: typeof Path;
    const _Query: typeof Query;
    const _Fragment: typeof Fragment;
    const _SchemeHostPortPathQueryFragment: typeof SchemeHostPortPathQueryFragment;
}
//# sourceMappingURL=Url.d.ts.map
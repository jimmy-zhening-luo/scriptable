interface UrlParts {
    scheme?: string | Scheme;
    host?: string | Host;
    port?: string | number | Port;
    path?: string | Path;
    query?: string | Query;
    fragment?: string | Fragment;
}
declare class Url {
    #private;
    constructor();
    constructor(url: Url);
    constructor(urlparts: UrlParts);
    constructor(url: string);
    constructor(scheme: Scheme, host?: Host | string, port?: Port | number | string, path?: Path | string, query?: Query | string, fragment?: Fragment | string);
    constructor(scheme: Scheme | string, host: Host | string, port?: Port | number | string, path?: Path | string, query?: Query | string, fragment?: Fragment | string);
    private parse;
    get scheme(): Scheme;
    set scheme(scheme: (string | Scheme | undefined));
    get host(): Host;
    set host(host: (string | Host | undefined));
    get port(): Port;
    set port(port: (string | number | Port | undefined));
    get path(): Path;
    set path(path: (string | Path | undefined));
    get query(): Query;
    set query(query: (string | Query | undefined));
    get fragment(): Fragment;
    set fragment(fragment: (string | Fragment | undefined));
    get string(): string;
    toString(): string;
    private static joinUrlParts;
    static appendHostToScheme(scheme: (string | Scheme), host: (string | Host)): string;
    static appendPortToLeft(left: string, port: (string | number | Port)): string;
    static appendPathToLeft(left: string, path: (string | Path)): string;
    static appendQueryToLeft(left: string, query: (string | Query)): string;
    static appendFragmentToLeft(left: string, fragment: (string | Fragment)): string;
    static encode(url: string): string;
    static decode(url: string): string;
    static encodePart(part: string): string;
    static decodePart(part: string): string;
}
//# sourceMappingURL=Url.d.ts.map
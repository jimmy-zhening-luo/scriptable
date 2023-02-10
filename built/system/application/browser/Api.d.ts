declare class Api {
    private _url;
    private _request;
    constructor(url: string | Url | Url.UrlParts, method?: ApiRequest.Method, authHeader?: string | [string, string] | {
        authType: string;
        authToken: string;
    }, headers?: [string, Types.primitive] | [string, Types.primitive][] | {
        [key: string]: Types.primitive;
    }, body?: string | RequestBody.RequestBodyInterface, timeoutSeconds?: number);
    private handleRequest;
    request(): any;
    requestObject(): any;
    requestString(): string;
    get url(): string;
    set url(url: string | Url | Url.UrlParts);
    get scheme(): string;
    set scheme(scheme: string | Scheme);
    get host(): string;
    set host(host: string | Host);
    get port(): string;
    set port(port: string | number | Port);
    get path(): string;
    set path(path: string | Path);
    get query(): string;
    set query(query: string | Query);
    addParam(...param: Parameters<Url["addParam"]>): this;
    deleteParam(...param: Parameters<Url["deleteParam"]>): this;
    get fragment(): string;
    set fragment(scheme: string | Scheme);
    get method(): ApiRequest.Method;
    set method(method: ApiRequest.Method);
    get auth(): string;
    set auth(authHeader: string);
    setAuthTypeAndToken(...auth: Parameters<ApiRequest["setAuthTypeAndToken"]>): this;
    deleteAuth(): this;
    get headerKeys(): typeof ApiRequest.prototype.keys;
    get headers(): typeof ApiRequest.prototype.headers;
    get headersObject(): typeof ApiRequest.prototype.headersObject;
    get headersStringObject(): typeof ApiRequest.prototype.headersStringObject;
    get headersString(): typeof ApiRequest.prototype.headersString;
    setHeader(...header: Parameters<ApiRequest["set"]>): this;
    deleteHeader(...header: Parameters<ApiRequest["delete"]>): this;
    addHeaders(...headers: Parameters<ApiRequest["add"]>): this;
    get body(): typeof ApiRequest.prototype.body;
    set body(body: string | RequestBody.RequestBodyInterface);
    get bodyObject(): typeof ApiRequest.prototype.bodyObject;
    get bodyStringObject(): typeof ApiRequest.prototype.bodyStringObject;
    get bodyString(): string;
    get timeout(): number;
    set timeout(timeoutSeconds: number);
}
declare namespace Api {
    const _Url: typeof Url;
    const _ApiRequest: typeof ApiRequest;
    const _ApiResponse: typeof ApiResponse;
    const Method: typeof ApiRequest.Method;
}
//# sourceMappingURL=Api.d.ts.map
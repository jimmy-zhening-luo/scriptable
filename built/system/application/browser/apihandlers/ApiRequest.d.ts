declare class ApiRequest {
    url: Types.stringful;
    method: ApiRequest.Method;
    private readonly _headers;
    private _body;
    private _timeoutSeconds;
    constructor(url: Types.stringful, method?: ApiRequest.Method, authHeader?: [string, string] | string | {
        authType: string;
        authToken: string;
    }, headers?: RequestHeaders.Input, body?: string | RequestBody.RequestBodyInterface, timeoutSeconds?: number);
    request(): string;
    get auth(): string;
    set auth(authHeader: string);
    setAuthTypeAndToken(...auth: Parameters<RequestHeaders["setAuthTypeAndToken"]>): this;
    deleteAuth(): this;
    get keys(): typeof RequestHeaders.prototype.keys;
    get headers(): typeof RequestHeaders.prototype.headers;
    get headersObject(): ReturnType<RequestHeaders["toObject"]>;
    get headersStringObject(): ReturnType<RequestHeaders["toStringObject"]>;
    get headersString(): ReturnType<RequestHeaders["toString"]>;
    set(...header: Parameters<RequestHeaders["set"]>): this;
    delete(...header: Parameters<RequestHeaders["delete"]>): this;
    add(...headers: Parameters<RequestHeaders["add"]>): this;
    get body(): typeof ApiRequest.prototype.bodyObject;
    set body(body: string | RequestBody.RequestBodyInterface);
    get bodyObject(): ReturnType<RequestBody["toObject"]>;
    get bodyStringObject(): ReturnType<RequestBody["toStringObject"]>;
    get bodyString(): ReturnType<RequestBody["toString"]>;
    get timeout(): number;
    set timeout(timeoutSeconds: number);
}
declare namespace ApiRequest {
    enum Method {
        GET = 0,
        POST = 1,
        PUT = 2
    }
    const _RequestHeaders: typeof RequestHeaders;
    const _RequestBody: typeof RequestBody;
    const _PositiveFiniteInteger: typeof PositiveFiniteInteger;
}
//# sourceMappingURL=ApiRequest.d.ts.map
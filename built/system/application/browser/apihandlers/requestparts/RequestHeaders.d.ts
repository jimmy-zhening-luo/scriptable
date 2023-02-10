declare class RequestHeaders {
    private readonly _headers;
    constructor();
    constructor(auth: string, headers?: RequestHeaders.Input);
    constructor(authType: string, authToken: string, headers?: RequestHeaders.Input);
    constructor(headers?: RequestHeaders.Input);
    get auth(): string;
    set auth(authString: string);
    get keys(): Types.stringful[];
    get headers(): Record<Types.stringful, Types.primitive>;
    setAuthTypeAndToken(authType: string, token: string): this;
    deleteAuth(): this;
    set(key: Types.stringful, value: Types.primitive): this;
    delete(key: Types.stringful): this;
    add(headers: RequestHeaders.Input): this;
    toObject(): typeof RequestHeaders.prototype.headers;
    toStringObject(): Record<Types.stringful, string>;
    toString(): string;
}
declare namespace RequestHeaders {
    type Input = [Types.stringful, Types.primitive] | [Types.stringful, Types.primitive][] | Record<Types.stringful, Types.primitive>;
    const _AuthRequestHeader: typeof AuthRequestHeader;
    const _GenericRequestHeader: typeof GenericRequestHeader;
}
//# sourceMappingURL=RequestHeaders.d.ts.map
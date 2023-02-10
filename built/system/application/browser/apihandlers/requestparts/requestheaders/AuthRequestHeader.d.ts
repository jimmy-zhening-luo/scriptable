declare const a_RequestHeader: typeof RequestHeader;
declare class AuthRequestHeader extends a_RequestHeader<string> {
    constructor(authString: string);
    constructor(authType: string, token: string);
    get auth(): string;
    set auth(authString: typeof AuthRequestHeader.prototype.auth);
    setAuthTypeAndToken(authType: string, token: string): this;
}
//# sourceMappingURL=AuthRequestHeader.d.ts.map
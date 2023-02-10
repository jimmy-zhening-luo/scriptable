declare class RequestBody {
    private readonly _body;
    constructor(body?: typeof RequestBody.prototype._body);
    toObject(): RequestBody.RequestBodyInterface;
    toStringObject(): RequestBody.StringRequestBodyInterface;
    toString(): string;
}
declare namespace RequestBody {
    interface RequestBodyInterface {
        [key: Types.stringful]: (Types.primitive | RequestBodyInterface | RequestBodyInterface[]);
    }
    interface StringRequestBodyInterface {
        [key: Types.stringful]: (string | StringRequestBodyInterface | StringRequestBodyInterface[]);
    }
}
//# sourceMappingURL=RequestBody.d.ts.map
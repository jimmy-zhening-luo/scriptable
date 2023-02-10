class ApiRequest {
    constructor(url, method = ApiRequest.Method.GET, authHeader, headers, body, timeoutSeconds) {
        this._timeoutSeconds = 30;
        this.url = url;
        this.method = method;
        this._headers = authHeader === undefined ?
            new ApiRequest._RequestHeaders(headers)
            : typeof authHeader === "string" ?
                new ApiRequest._RequestHeaders(authHeader, headers)
                : Array.isArray(authHeader) ?
                    new ApiRequest._RequestHeaders(authHeader[0], authHeader[1], headers)
                    : new ApiRequest._RequestHeaders(authHeader.authType, authHeader.authToken, headers);
        this._body = new ApiRequest._RequestBody(body);
        if (timeoutSeconds !== undefined)
            this.timeout = timeoutSeconds;
    }
    request() {
        var response = "";
        const req = new Request(this.url);
        req.headers = this.headersStringObject;
        req.body = this.bodyString;
        req.method = this.method.toString();
        req.timeoutInterval = this._timeoutSeconds;
        req.loadString().then((_response) => {
            response = _response !== null && _response !== void 0 ? _response : "";
        });
        return response;
    }
    get auth() {
        return this._headers.auth;
    }
    set auth(authHeader) {
        this._headers.auth = authHeader;
    }
    setAuthTypeAndToken(...auth) {
        this._headers.setAuthTypeAndToken(...auth);
        return this;
    }
    deleteAuth() {
        this._headers.deleteAuth();
        return this;
    }
    get keys() {
        return this._headers.keys;
    }
    get headers() {
        return this._headers.headers;
    }
    get headersObject() {
        return this._headers.toObject();
    }
    get headersStringObject() {
        return this._headers.toStringObject();
    }
    get headersString() {
        return this._headers.toString();
    }
    set(...header) {
        this._headers.set(...header);
        return this;
    }
    delete(...header) {
        this._headers.delete(...header);
        return this;
    }
    add(...headers) {
        this._headers.add(...headers);
        return this;
    }
    get body() {
        return this.bodyObject;
    }
    set body(body) {
        this._body = new ApiRequest._RequestBody(body);
    }
    get bodyObject() {
        return this._body.toObject();
    }
    get bodyStringObject() {
        return this._body.toStringObject();
    }
    get bodyString() {
        return this._body.toString();
    }
    get timeout() {
        return this._timeoutSeconds;
    }
    set timeout(timeoutSeconds) {
        if (new ApiRequest._PositiveFiniteInteger(timeoutSeconds).isNumber)
            this._timeoutSeconds = timeoutSeconds;
    }
}
(function (ApiRequest) {
    let Method;
    (function (Method) {
        Method[Method["GET"] = 0] = "GET";
        Method[Method["POST"] = 1] = "POST";
        Method[Method["PUT"] = 2] = "PUT";
    })(Method = ApiRequest.Method || (ApiRequest.Method = {}));
    ApiRequest._RequestHeaders = importModule("requestparts/RequestHeaders");
    ApiRequest._RequestBody = importModule("requestparts/RequestBody");
    ApiRequest._PositiveFiniteInteger = importModule("./system/application/common/primitives/numbers/PositiveFiniteInteger");
})(ApiRequest || (ApiRequest = {}));
module.exports = ApiRequest;
//# sourceMappingURL=ApiRequest.js.map
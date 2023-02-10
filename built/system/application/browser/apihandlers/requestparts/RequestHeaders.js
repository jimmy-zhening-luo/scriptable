class RequestHeaders {
    constructor(authOrAuthTypeOrHeaders, authTokenOrHeaders, headers) {
        this._headers = {};
        if (authOrAuthTypeOrHeaders === undefined) { }
        else if (typeof authOrAuthTypeOrHeaders !== "string")
            this.add(authOrAuthTypeOrHeaders);
        else {
            if (authTokenOrHeaders === undefined || typeof authTokenOrHeaders !== "string")
                this.auth = authOrAuthTypeOrHeaders;
            else
                this.setAuthTypeAndToken(authOrAuthTypeOrHeaders, authTokenOrHeaders);
            if (authTokenOrHeaders === undefined) { }
            else if (typeof authTokenOrHeaders === "string") {
                if (headers !== undefined)
                    this.add(headers);
            }
            else
                this.add(authTokenOrHeaders);
        }
    }
    get auth() {
        return "Authorization" in this._headers ?
            this._headers.Authorization.auth
            : "";
    }
    set auth(authString) {
        authString === "" ?
            delete this._headers.Authorization
            : this._headers.Authorization = new RequestHeaders._AuthRequestHeader(authString);
    }
    get keys() {
        return Object.keys(this._headers);
    }
    get headers() {
        return this.keys
            .reduce((obj, key) => {
            obj[key] = this._headers[key].value;
            return obj;
        }, {});
    }
    setAuthTypeAndToken(authType, token) {
        this.auth = [authType, token].join(" ");
        return this;
    }
    deleteAuth() {
        this.auth = "";
        return this;
    }
    set(key, value) {
        this._headers[key] = new RequestHeaders._GenericRequestHeader(key, value);
        return this;
    }
    delete(key) {
        delete this._headers[key];
        return this;
    }
    add(headers) {
        if (!Array.isArray(headers))
            Object.keys(headers)
                .forEach(key => this.set(key, headers[key]));
        else {
            if (headers.length === 0) { }
            else if (typeof headers[0] === "string") {
                this.set(headers[0], headers[1]);
            }
            else {
                headers.forEach(header => {
                    this.set(header[0], header[1]);
                });
            }
        }
        return this;
    }
    toObject() {
        return this.headers;
    }
    toStringObject() {
        return this.keys
            .reduce((obj, key) => {
            obj[key] = this._headers[key].stringValue;
            return obj;
        }, {});
    }
    toString() {
        return Object.keys(this.headers)
            .map(key => this
            .headers[key]
            .toString())
            .join("\r\n");
    }
}
(function (RequestHeaders) {
    RequestHeaders._AuthRequestHeader = importModule("requestheaders/AuthRequestHeader");
    RequestHeaders._GenericRequestHeader = importModule("requestheaders/GenericRequestHeader");
})(RequestHeaders || (RequestHeaders = {}));
module.exports = RequestHeaders;
//# sourceMappingURL=RequestHeaders.js.map
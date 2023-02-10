class Api {
    constructor(url, method = Api.Method.GET, authHeader, headers, body, timeoutSeconds) {
        this._url = new Api._Url(url);
        this._request = new Api._ApiRequest(new Api._Url(url).toString(), method, authHeader, headers, body, timeoutSeconds);
    }
    handleRequest() {
        this._request.url = this.url;
        return new Api._ApiResponse(this._request.request());
    }
    request() {
        return this.handleRequest().response;
    }
    requestObject() {
        return this.handleRequest().toObject();
    }
    requestString() {
        return this.handleRequest().toString();
    }
    get url() {
        return this._url.toString();
    }
    set url(url) {
        this._url = new Url(url);
    }
    get scheme() {
        return this._url.scheme;
    }
    set scheme(scheme) {
        this._url.scheme = scheme;
    }
    get host() {
        return this._url.host;
    }
    set host(host) {
        this._url.host = host;
    }
    get port() {
        return this._url.port;
    }
    set port(port) {
        this._url.port = port;
    }
    get path() {
        return this._url.path;
    }
    set path(path) {
        this._url.path = path;
    }
    get query() {
        return this._url.query;
    }
    set query(query) {
        this._url.query = query;
    }
    addParam(...param) {
        this._url.addParam(...param);
        return this;
    }
    deleteParam(...param) {
        this._url.deleteParam(...param);
        return this;
    }
    get fragment() {
        return this._url.fragment;
    }
    set fragment(scheme) {
        this._url.scheme = scheme;
    }
    get method() {
        return this._request.method;
    }
    set method(method) {
        this._request.method = method;
    }
    get auth() {
        return this._request.auth;
    }
    set auth(authHeader) {
        this._request.auth = authHeader;
    }
    setAuthTypeAndToken(...auth) {
        this._request.setAuthTypeAndToken(...auth);
        return this;
    }
    deleteAuth() {
        this._request.deleteAuth();
        return this;
    }
    get headerKeys() {
        return this._request.keys;
    }
    get headers() {
        return this._request.headers;
    }
    get headersObject() {
        return this._request.headersObject;
    }
    get headersStringObject() {
        return this._request.headersStringObject;
    }
    get headersString() {
        return this._request.headersString;
    }
    setHeader(...header) {
        this._request.set(...header);
        return this;
    }
    deleteHeader(...header) {
        this._request.delete(...header);
        return this;
    }
    addHeaders(...headers) {
        this._request.add(...headers);
        return this;
    }
    get body() {
        return this._request.body;
    }
    set body(body) {
        this._request.body = body;
    }
    get bodyObject() {
        return this._request.bodyObject;
    }
    get bodyStringObject() {
        return this._request.bodyStringObject;
    }
    get bodyString() {
        return this._request.bodyString;
    }
    get timeout() {
        return this._request.timeout;
    }
    set timeout(timeoutSeconds) {
        this._request.timeout = timeoutSeconds;
    }
}
(function (Api) {
    Api._Url = importModule("Url");
    Api._ApiRequest = importModule("apihandlers/ApiRequest");
    Api._ApiResponse = importModule("apihandlers/ApiResponse");
    Api.Method = Api._ApiRequest.Method;
})(Api || (Api = {}));
module.exports = Api;
//# sourceMappingURL=Api.js.map
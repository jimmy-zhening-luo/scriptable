class Api {

  private _url: Url;
  private _request: ApiRequest;

  constructor(
    url: ConstructorParameters<typeof Url>[0],
    method: ApiRequest.Method = Api.Method.GET,
    authHeader?:
      | string
      | [Types.stringful, string]
      | {
        authType: string,
        authToken: string
      },
    headers?:
      | [Types.stringful, Types.primitive]
      | [Types.stringful, Types.primitive][]
      | { [key: Types.stringful]: Types.primitive },
    body?:
      | string
      | RequestBody.RequestBodyInterface,
    timeoutSeconds?: number
  ) {
    this._url = new Api.Url(url);
    this._request = new Api.ApiRequest(
      new Api.Url(url).toString(),
      method,
      authHeader,
      headers,
      body,
      timeoutSeconds
    );
  }

  private handleRequest(): ApiResponse {
    this._request.url = this.url;
    return new Api.ApiResponse(
      this._request.request()
    );
  }

  request(): any {
    return this.handleRequest().response;
  }

  requestObject(): any {
    return this.handleRequest().toObject();
  }

  requestString(): string {
    return this.handleRequest().toString();
  }

  get url(): string {
    return this._url.toString();
  }

  set url(
    url: ConstructorParameters<typeof Url>[0]
  ) {
    this._url = new Url(url);
  }

  get scheme(): string {
    return this._url.scheme;
  }

  set scheme(
    scheme: ConstructorParameters<typeof Scheme>[0]
  ) {
    this._url.scheme = scheme;
  }

  get host(): string {
    return this._url.host;
  }

  set host(
    host: ConstructorParameters<typeof Host>[0]
  ) {
    this._url.host = host;
  }

  get port(): string {
    return this._url.port;
  }

  set port(
    port: ConstructorParameters<typeof Port>[0]
  ) {
    this._url.port = port;
  }

  get path(): string {
    return this._url.path;
  }

  set path(
    path: ConstructorParameters<typeof Path>[0]
  ) {
    this._url.path = path;
  }

  get query(): string {
    return this._url.query;
  }

  set query(
    query: ConstructorParameters<typeof Query>[0]
  ) {
    this._url.query = query;
  }

  addParam(
    ...param: Parameters<Url["addParam"]>
  ): this {
    this._url.addParam(...param);
    return this;
  }

  deleteParam(
    ...param: Parameters<Url["deleteParam"]>
  ): this {
    this._url.deleteParam(...param);
    return this;
  }

  getParam(
    ...param: Parameters<Url["getParam"]>
  ): ReturnType<Url["getParam"]> {
    return this._url.getParam(...param);
  }

  hasParam(
    ...param: Parameters<Url["hasParam"]>
  ): ReturnType<Url["hasParam"]> {
    return this._url.hasParam(...param);
  }

  get fragment(): string {
    return this._url.fragment;
  }

  set fragment(scheme: string | Scheme) {
    this._url.scheme = scheme;
  }

  get method(): ApiRequest.Method {
    return this._request.method;
  }

  set method(method: ApiRequest.Method) {
    this._request.method = method;
  }

  get auth(): string {
    return this._request.auth;
  }

  set auth(
    authHeader: string
  ) {
    this._request.auth = authHeader;
  }

  setAuthTypeAndToken(
    ...auth: Parameters<ApiRequest["setAuthTypeAndToken"]>
  ): this {
    this._request.setAuthTypeAndToken(...auth);
    return this;
  }

  deleteAuth(): this {
    this._request.deleteAuth();
    return this;
  }

  get headerKeys(): typeof ApiRequest.prototype.keys {
    return this._request.keys;
  }

  get headers(): typeof ApiRequest.prototype.headers {
    return this._request.headers;
  }

  get headersObject(): typeof ApiRequest.prototype.headersObject {
    return this._request.headersObject;
  }

  get headersStringObject(): typeof ApiRequest.prototype.headersStringObject {
    return this._request.headersStringObject;
  }

  get headersString(): typeof ApiRequest.prototype.headersString {
    return this._request.headersString;
  }

  setHeader(
    ...header: Parameters<ApiRequest["set"]>
  ): this {
    this._request.set(...header);
    return this;
  }

  deleteHeader(
    ...header: Parameters<ApiRequest["delete"]>
  ): this {
    this._request.delete(...header);
    return this;
  }

  addHeaders(
    ...headers: Parameters<ApiRequest["add"]>
  ): this {
    this._request.add(...headers);
    return this;
  }

  get body(): typeof ApiRequest.prototype.body {
    return this._request.body;
  }

  set body(
    body: string | RequestBody.RequestBodyInterface
  ) {
    this._request.body = body;
  }

  get bodyObject(): typeof ApiRequest.prototype.bodyObject {
    return this._request.bodyObject;
  }

  get bodyStringObject(): typeof ApiRequest.prototype.bodyStringObject {
    return this._request.bodyStringObject;
  }

  get bodyString(): string {
    return this._request.bodyString;
  }

  get timeout(): number {
    return this._request.timeout;
  }

  set timeout(timeoutSeconds: number) {
    this._request.timeout = timeoutSeconds;
  }

  get Url(): typeof Url {
    return Api.Url;
  }

  get ApiRequest(): typeof ApiRequest {
    return Api.ApiRequest;
  }

  get ApiResponse(): typeof ApiResponse {
    return Api.ApiResponse;
  }

  static get Url(): typeof Url {
    return importModule("Url");
  }

  static get ApiRequest(): typeof ApiRequest {
    return importModule("apihandlers/ApiRequest")
  }

  static get ApiResponse(): typeof ApiResponse {
    return importModule("apihandlers/ApiResponse");
  }

}

namespace Api {

  export const Method: typeof ApiRequest.Method = Api.ApiRequest.Method;

}

module.exports = Api;

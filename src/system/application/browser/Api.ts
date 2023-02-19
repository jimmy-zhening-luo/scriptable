class Api {

  private _url: Url;
  private _requestHeaders: RequestHeaders;
  private _requestBody: RequestBody;
  private _timeoutSeconds: number;

  constructor(
    urlOrApi:
      | Api
      | ConstructorParameters<typeof Url>[0],
    method: Api.Method = Api.Method.GET,
    httpAuthHeader?:
      | string
      | [keyof typeof Api.AuthScheme, Api.AuthToken]
    |
    httpHeaders?:
      | [string, primitive]
      | [string, primitive][]
      | { [key: string]: primitive },
    body?: ConstructorParameters<typeof RequestBody>[0],
    timeoutSeconds?: number = 60
  ) {
    if (urlOrApi instanceof Api) {
      const api: Api = urlOrApi;
      this._url = new this.Url(api.url);
      this._requestHeaders = new this.RequestHeaders(
        api.headers
      );
      this._requestBody = new this.RequestBody(
        api.body
      );
      this._timeoutSeconds = api.timeout;
    }
    else {
      this._url = new this.Url(urlOrApi);
      this._requestHeaders = new this.RequestHeaders(
        headers
      )
      this._requestBody = new this.RequestBody(body);
      this._timeoutSeconds = timeoutSeconds;
    }
  }

  private handleRequest(): ResponseBody {
    this._request.url = this.url;
    return new Api.ApiResponse(
      this._request.request()
    );
    request(): string {
      var response: string = "";
      const req: Request = new Request(this.url);
      req.headers = this.headersStringObject;
      req.body = this.bodyString;
      req.method = this.method.toString();
      req.timeoutInterval = this._timeoutSeconds;
      req.loadString().then((_response) => {
        response = _response ?? "";
      });
      return response;
    }
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
    return this._timeoutSeconds;
  }

  set timeout(
    timeoutSeconds: number
  ) {
    if (
      new this.PositiveFiniteInteger(
        timeoutSeconds
      ).isNumber
    )
      this._timeoutSeconds = timeoutSeconds;
  }

  get Url(): typeof Url {
    return Api.Url;
  }

  get RequestHeaders(): typeof RequestHeaders {
    return Api.RequestHeaders;
  }

  get RequestBody(): typeof RequestBody {
    return Api.RequestBody;
  }

  get ResponseBody(): typeof ResponseBody {
    return Api.ResponseBody;
  }

  get Common(): typeof Common {
    return Api.Common;
  }

  private get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    return this.Common.Types.Numbers.PositiveFiniteInteger;
  }

  static get Url(): typeof Url {
    return importModule("Url");
  }

  static get ApiHandlers(): typeof ApiHandlers {
    return importModule("apiparts/ApiParts");
  }

  static get RequestParts(): typeof RequestParts {
    return Api.ApiHandlers.RequestParts;
  }

  static get RequestHeaders(): typeof RequestHeaders {
    return Api.RequestParts.RequestHeaders;
  }

  static get RequestBody(): typeof RequestBody {
    return Api.RequestParts.RequestBody;
  }

  static get ResponseParts(): typeof ResponseParts {
    return Api.ApiHandlers.ResponseParts;
  }

  static get ResponseBody(): typeof ResponseBody {
    return Api.ResponseParts.ResponseBody;
  }

  static get Common(): typeof Common {
    return importModule("./common/Common");
  }

}

namespace Api {

  export enum Method {
    GET,
    POST,
    PUT,
    DELETE
  }

  export enum AuthScheme {
    Bearer,
    Basic,
    Digest
  }

}

module.exports = Api;

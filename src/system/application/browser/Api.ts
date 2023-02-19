class Api {

  private _url: Url;
  private _method: keyof typeof Api.Method;
  private _requestHeaders: RequestHeaders;
  private _requestBody: RequestBody;
  private _timeoutSeconds: number;

  constructor(
    url: ConstructorParameters<typeof Url>[0],
    method: keyof typeof Api.Method | Api.Method = Api.Method.GET,
    {
      authScheme = "",
      authToken = "",
      requestBody = "",
      timeoutSeconds = 60
    }: {
      authScheme?: ConstructorParameters<typeof RequestHeaders>[0],
      authToken?: ConstructorParameters<typeof RequestHeaders>[1],
      requestBody?: ConstructorParameters<typeof RequestBody>[0]
      timeoutSeconds?: number
    },
    ...httpHeaders: Parameters<typeof RequestHeaders.prototype.addHeader>
  ) {
    this._url = new this.Url(url);
    this._method = method.toString() as keyof typeof Api.Method;
    this._requestHeaders = new this.RequestHeaders(
      authScheme,
      authToken,
      ...httpHeaders
    );
    this._requestBody = new this.RequestBody(
      requestBody
    );
    this._timeoutSeconds = new this.PositiveFiniteInteger(timeoutSeconds).isValidNumber ?
      timeoutSeconds
      : 60;
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

  get method(): keyof typeof Api.Method {
    return this._method;
  }

  set method(method: keyof typeof Api.Method | Api.Method) {
    this._method = method.toString() as keyof typeof Api.Method;
  }

  get hasAuth(): typeof RequestHeaders.prototype.hasAuth {
    return this._requestHeaders.hasAuth;
  }

  get authScheme(): typeof RequestHeaders.prototype.scheme {
    return this._requestHeaders.scheme;
  }

  set authScheme(
    scheme: typeof RequestHeaders.prototype.scheme
  ) {
    this._requestHeaders.scheme = scheme;
  }

  get authToken(): typeof RequestHeaders.prototype.token {
    return this._requestHeaders.token;
  }

  set authToken(
    token: typeof RequestHeaders.prototype.token
  ) {
    this._requestHeaders.token = token;
  }

  get auth(): typeof RequestHeaders.prototype.auth {
    return this._requestHeaders.auth;
  }

  set auth(
    auth: typeof RequestHeaders.prototype.auth
  ) {
    this._requestHeaders.auth = auth;
  }

  deleteAuth(): this {
    this._requestHeaders.deleteAuth();
    return this;
  }

  get headers(): typeof RequestHeaders.prototype.headers {
    return this._requestHeaders.headers;
  }

  get headersStringObject(): typeof Request.prototype.headers {
    return Object.fromEntries(
      [...this._requestHeaders.headers.entries()]
        .map(
          ([key, value]) => [key, value.toString()]
      )
    )
  }

  get headersString(): string {
    return this._requestHeaders.toString();
  }

  get headerKeys(): typeof RequestHeaders.prototype.keys {
    return this._requestHeaders.keys;
  }

  hasHeader(
    ...header: Parameters<RequestHeaders["hasHeader"]>
  ): ReturnType<RequestHeaders["hasHeader"]> {
    return this._requestHeaders.hasHeader(...header);
  }

  addHeader(
    ...header: Parameters<RequestHeaders["addHeader"]>
  ): this {
    this._requestHeaders.addHeader(...header);
    return this;
  }

  getValue(
    ...header: Parameters<RequestHeaders["getValue"]>
  ): ReturnType<RequestHeaders["getValue"]> {
    return this._requestHeaders.getValue(...header);
  }

  getStringValue(
    ...header: Parameters<RequestHeaders["getStringValue"]>
  ): ReturnType<RequestHeaders["getStringValue"]> {
    return this._requestHeaders.getStringValue(...header);
  }

  getNullableValue(
    ...header: Parameters<RequestHeaders["getNullableValue"]>
  ): ReturnType<RequestHeaders["getNullableValue"]> {
    return this._requestHeaders.getNullableValue(...header);
  }

  getHeader(
    ...header: Parameters<RequestHeaders["getHeader"]>
  ): ReturnType<RequestHeaders["getHeader"]> {
    return this._requestHeaders.getHeader(...header);
  }

  deleteHeader(
    ...header: Parameters<RequestHeaders["deleteHeader"]>
  ): this {
    this._requestHeaders.deleteHeader(...header);
    return this;
  }

  get body(): typeof Api.prototype.bodyString {
    return this.bodyString;
  }

  get bodyString(): ReturnType<RequestBody["toString"]> {
    return this._requestBody.toString();
  }

  get bodyObject(): ReturnType<RequestBody["toObject"]> {
    return this._requestBody.toObject();
  }

  get bodyStringObject(): ReturnType<RequestBody["toStringObject"]> {
    return this._requestBody.toStringObject();
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
      ).isValidNumber
    )
      this._timeoutSeconds = timeoutSeconds;
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

  private handleRequest(): ResponseBody {
    var response: string = "";
    const req: Request = new Request(this.url);
    req.headers = this.headersStringObject;
    req.body = this.body;
    req.method = this.method;
    req.timeoutInterval = this.timeout;
    req.loadString().then((_response) => {
      response = _response ?? "";
    });
    return new this.ResponseBody(response);
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

  private get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    return Api.PositiveFiniteInteger;
  }

  static get Url(): typeof Url {
    return importModule("Url");
  }

  static get ApiParts(): typeof ApiParts {
    return importModule("apiparts/ApiParts");
  }

  static get RequestParts(): typeof RequestParts {
    return Api.ApiParts.RequestParts;
  }

  static get RequestHeaders(): typeof RequestHeaders {
    return Api.RequestParts.RequestHeaders;
  }

  static get RequestBody(): typeof RequestBody {
    return Api.RequestParts.RequestBody;
  }

  static get ResponseParts(): typeof ResponseParts {
    return Api.ApiParts.ResponseParts;
  }

  static get ResponseBody(): typeof ResponseBody {
    return Api.ResponseParts.ResponseBody;
  }

  static get Types(): typeof Types {
    return importModule("./common/types/Types");
  }

  static get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    return Api.Types.Numbers.PositiveFiniteInteger;
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

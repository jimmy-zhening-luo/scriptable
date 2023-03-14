class Api {
  private _url: Url;
  private _method: Api.Method;
  private readonly _requestHeaders: RequestHeaders;
  private readonly _requestBody: RequestBody;
  private _timeoutSeconds: number;

  constructor(
    url: ConstructorParameters<typeof Url>[0],
    method: Api.Method = Api.Method.GET,
    {
      authScheme = "",
      authToken = "",
      requestBody = "",
      timeoutSeconds = 60,
    }: {
      authScheme?: ConstructorParameters<typeof RequestHeaders>[0];
      authToken?: ConstructorParameters<typeof RequestHeaders>[1];
      requestBody?: ConstructorParameters<typeof RequestBody>[0];
      timeoutSeconds?: number;
    },
    ...httpHeaders: Parameters<typeof RequestHeaders.prototype.addHeader>
  ) {
    try {
      this._url = new Api.Url(url);
      this._method = method;
      this._requestHeaders = new Api.RequestHeaders(
        authScheme,
        authToken,
        ...httpHeaders,
      );
      this._requestBody = new Api.RequestBody(requestBody);
      this._timeoutSeconds = new Api.PositiveFiniteInteger(timeoutSeconds)
        .isValid
        ? timeoutSeconds
        : 60;
    } catch (e) {
      throw new Error(`Api: constructor: error creating Api: \n${e}`);
    }
  }

  get url(): string {
    try {
      return this._url.toString();
    } catch (e) {
      throw new Error(`Api: get url: error getting url: \n${e}`);
    }
  }

  set url(url: ConstructorParameters<typeof Url>[0]) {
    try {
      this._url = new Url(url);
    } catch (e) {
      throw new Error(`Api: set url: error setting url: \n${e}`);
    }
  }

  get scheme(): string {
    try {
      return this._url.scheme;
    } catch (e) {
      throw new Error(`Api: get scheme: error getting scheme: \n${e}`);
    }
  }

  set scheme(scheme: ConstructorParameters<typeof Scheme>[0]) {
    try {
      this._url.scheme = scheme;
    } catch (e) {
      throw new Error(`Api: set scheme: error setting scheme: \n${e}`);
    }
  }

  get host(): string {
    try {
      return this._url.host;
    } catch (e) {
      throw new Error(`Api: get host: error getting host: \n${e}`);
    }
  }

  set host(host: ConstructorParameters<typeof Host>[0]) {
    try {
      this._url.host = host;
    } catch (e) {
      throw new Error(`Api: set host: error setting host: \n${e}`);
    }
  }

  get port(): string {
    try {
      return this._url.port;
    } catch (e) {
      throw new Error(`Api: get port: error getting port: \n${e}`);
    }
  }

  set port(port: ConstructorParameters<typeof Port>[0]) {
    try {
      this._url.port = port;
    } catch (e) {
      throw new Error(`Api: set port: error setting port: \n${e}`);
    }
  }

  get path(): string {
    try {
      return this._url.path;
    } catch (e) {
      throw new Error(`Api: get path: error getting path: \n${e}`);
    }
  }

  set path(path: ConstructorParameters<typeof Path>[0]) {
    try {
      this._url.path = path;
    } catch (e) {
      throw new Error(`Api: set path: error setting path: \n${e}`);
    }
  }

  get query(): string {
    try {
      return this._url.query;
    } catch (e) {
      throw new Error(`Api: get query: error getting query: \n${e}`);
    }
  }

  set query(query: ConstructorParameters<typeof Query>[0]) {
    try {
      this._url.query = query;
    } catch (e) {
      throw new Error(`Api: set query: error setting query: \n${e}`);
    }
  }

  addParam(...param: Parameters<Url["addParam"]>): this {
    try {
      this._url.addParam(...param);
      return this;
    } catch (e) {
      throw new Error(`Api: addParam: error adding param: \n${e}`);
    }
  }

  deleteParam(...param: Parameters<Url["deleteParam"]>): this {
    try {
      this._url.deleteParam(...param);
      return this;
    } catch (e) {
      throw new Error(`Api: deleteParam: error deleting param: \n${e}`);
    }
  }

  getParam(...param: Parameters<Url["getParam"]>): ReturnType<Url["getParam"]> {
    try {
      return this._url.getParam(...param);
    } catch (e) {
      throw new Error(`Api: getParam: error getting param: \n${e}`);
    }
  }

  hasParam(...param: Parameters<Url["hasParam"]>): ReturnType<Url["hasParam"]> {
    try {
      return this._url.hasParam(...param);
    } catch (e) {
      throw new Error(`Api: hasParam: error checking param: \n${e}`);
    }
  }

  get fragment(): string {
    try {
      return this._url.fragment;
    } catch (e) {
      throw new Error(`Api: get fragment: error getting fragment: \n${e}`);
    }
  }

  set fragment(scheme: string | Scheme) {
    try {
      this._url.scheme = scheme;
    } catch (e) {
      throw new Error(`Api: set fragment: error setting fragment: \n${e}`);
    }
  }

  get method(): typeof Api.prototype._method {
    try {
      return this._method;
    } catch (e) {
      throw new Error(`Api: get method: error getting method: \n${e}`);
    }
  }

  set method(method: typeof Api.prototype._method) {
    try {
      this._method = method;
    } catch (e) {
      throw new Error(`Api: set method: error setting method: \n${e}`);
    }
  }

  get hasAuth(): typeof RequestHeaders.prototype.hasAuth {
    try {
      return this._requestHeaders.hasAuth;
    } catch (e) {
      throw new Error(`Api: get hasAuth: error getting hasAuth: \n${e}`);
    }
  }

  get authScheme(): typeof RequestHeaders.prototype.scheme {
    try {
      return this._requestHeaders.scheme;
    } catch (e) {
      throw new Error(`Api: get authScheme: error getting authScheme: \n${e}`);
    }
  }

  set authScheme(scheme: typeof RequestHeaders.prototype.scheme) {
    try {
      this._requestHeaders.scheme = scheme;
    } catch (e) {
      throw new Error(`Api: set authScheme: error setting authScheme: \n${e}`);
    }
  }

  get authToken(): typeof RequestHeaders.prototype.token {
    try {
      return this._requestHeaders.token;
    } catch (e) {
      throw new Error(`Api: get authToken: error getting authToken: \n${e}`);
    }
  }

  set authToken(token: typeof RequestHeaders.prototype.token) {
    try {
      this._requestHeaders.token = token;
    } catch (e) {
      throw new Error(`Api: set authToken: error setting authToken: \n${e}`);
    }
  }

  get auth(): typeof RequestHeaders.prototype.auth {
    try {
      return this._requestHeaders.auth;
    } catch (e) {
      throw new Error(`Api: get auth: error getting auth: \n${e}`);
    }
  }

  set auth(auth: typeof RequestHeaders.prototype.auth) {
    try {
      this._requestHeaders.auth = auth;
    } catch (e) {
      throw new Error(`Api: set auth: error setting auth: \n${e}`);
    }
  }

  deleteAuth(): this {
    try {
      this._requestHeaders.deleteAuth();
      return this;
    } catch (e) {
      throw new Error(`Api: deleteAuth: error deleting auth: \n${e}`);
    }
  }

  get headers(): typeof RequestHeaders.prototype.headers {
    try {
      return this._requestHeaders.headers;
    } catch (e) {
      throw new Error(`Api: get headers: error getting headers: \n${e}`);
    }
  }

  get headersStringObject(): typeof Request.prototype.headers {
    try {
      return Object.fromEntries(
        [...this._requestHeaders.headers.entries()].map(([key, value]) => [
          key,
          value.toString(),
        ]),
      );
    } catch (e) {
      throw new Error(
        `Api: get headersStringObject: error getting headersStringObject: \n${e}`,
      );
    }
  }

  get headersString(): string {
    try {
      return this._requestHeaders.toString();
    } catch (e) {
      throw new Error(
        `Api: get headersString: error getting headersString: \n${e}`,
      );
    }
  }

  get headerKeys(): typeof RequestHeaders.prototype.keys {
    try {
      return this._requestHeaders.keys;
    } catch (e) {
      throw new Error(`Api: get headerKeys: error getting headerKeys: \n${e}`);
    }
  }

  hasHeader(
    ...header: Parameters<RequestHeaders["hasHeader"]>
  ): ReturnType<RequestHeaders["hasHeader"]> {
    try {
      return this._requestHeaders.hasHeader(...header);
    } catch (e) {
      throw new Error(`Api: hasHeader: error checking header: \n${e}`);
    }
  }

  addHeader(...header: Parameters<RequestHeaders["addHeader"]>): this {
    try {
      this._requestHeaders.addHeader(...header);
      return this;
    } catch (e) {
      throw new Error(`Api: addHeader: error adding header: \n${e}`);
    }
  }

  getValue(
    ...header: Parameters<RequestHeaders["getValue"]>
  ): ReturnType<RequestHeaders["getValue"]> {
    try {
      return this._requestHeaders.getValue(...header);
    } catch (e) {
      throw new Error(`Api: getValue: error getting header value: \n${e}`);
    }
  }

  getStringValue(
    ...header: Parameters<RequestHeaders["getStringValue"]>
  ): ReturnType<RequestHeaders["getStringValue"]> {
    try {
      return this._requestHeaders.getStringValue(...header);
    } catch (e) {
      throw new Error(
        `Api: getStringValue: error getting header value: \n${e}`,
      );
    }
  }

  getNullableValue(
    ...header: Parameters<RequestHeaders["getNullableValue"]>
  ): ReturnType<RequestHeaders["getNullableValue"]> {
    try {
      return this._requestHeaders.getNullableValue(...header);
    } catch (e) {
      throw new Error(
        `Api: getNullableValue: error getting header value: \n${e}`,
      );
    }
  }

  getHeader(
    ...header: Parameters<RequestHeaders["getHeader"]>
  ): ReturnType<RequestHeaders["getHeader"]> {
    try {
      return this._requestHeaders.getHeader(...header);
    } catch (e) {
      throw new Error(`Api: getHeader: error getting header: \n${e}`);
    }
  }

  deleteHeader(...header: Parameters<RequestHeaders["deleteHeader"]>): this {
    try {
      this._requestHeaders.deleteHeader(...header);
      return this;
    } catch (e) {
      throw new Error(`Api: deleteHeader: error deleting header: \n${e}`);
    }
  }

  get body(): typeof Api.prototype.bodyString {
    try {
      return this.bodyString;
    } catch (e) {
      throw new Error(`Api: get body: error getting body: \n${e}`);
    }
  }

  get bodyString(): ReturnType<RequestBody["toString"]> {
    try {
      return this._requestBody.toString();
    } catch (e) {
      throw new Error(`Api: get bodyString: error getting bodyString: \n${e}`);
    }
  }

  get bodyObject(): ReturnType<RequestBody["toObject"]> {
    try {
      return this._requestBody.toObject();
    } catch (e) {
      throw new Error(`Api: get bodyObject: error getting bodyObject: \n${e}`);
    }
  }

  get bodyStringObject(): ReturnType<RequestBody["toStringObject"]> {
    try {
      return this._requestBody.toStringObject();
    } catch (e) {
      throw new Error(
        `Api: get bodyStringObject: error getting bodyStringObject: \n${e}`,
      );
    }
  }

  get timeout(): number {
    try {
      return this._timeoutSeconds;
    } catch (e) {
      throw new Error(`Api: get timeout: error getting timeout: \n${e}`);
    }
  }

  set timeout(timeoutSeconds: number) {
    try {
      if (new Api.PositiveFiniteInteger(timeoutSeconds).isValid)
        this._timeoutSeconds = timeoutSeconds;
    } catch (e) {
      throw new Error(`Api: set timeout: error setting timeout: \n${e}`);
    }
  }

  request(): any {
    try {
      return this.handleRequest().response;
    } catch (e) {
      throw new Error(`Api: request: error making request: \n${e}`);
    }
  }

  requestObject(): any {
    try {
      return this.handleRequest().toObject();
    } catch (e) {
      throw new Error(`Api: requestObject: error making request: \n${e}`);
    }
  }

  requestString(): string {
    try {
      return this.handleRequest().toString();
    } catch (e) {
      throw new Error(`Api: requestString: error making request: \n${e}`);
    }
  }

  private handleRequest(): ResponseBody {
    var response: string = "";
    const req: Request = new Request(this.url);
    req.headers = this.headersStringObject;
    req.body = this.body;
    req.method = Api.Method[this.method];
    req.timeoutInterval = this.timeout;
    req.loadString().then(_response => {
      response = _response;
    });
    try {
      return new Api.ResponseBody(response);
    } catch (e) {
      throw new Error(`Api: handleRequest: error handling request: \n${e}`);
    }
  }

  static get Url(): typeof Url {
    try {
      return importModule("Url");
    } catch (e) {
      throw new Error(`Api: get Url: error getting Url: \n${e}`);
    }
  }

  static get ApiParts(): typeof ApiParts {
    try {
      return importModule("apiparts/ApiParts");
    } catch (e) {
      throw new Error(`Api: get ApiParts: error getting ApiParts: \n${e}`);
    }
  }

  static get RequestParts(): typeof RequestParts {
    try {
      return Api.ApiParts.RequestParts;
    } catch (e) {
      throw new Error(
        `Api: get RequestParts: error getting RequestParts: \n${e}`,
      );
    }
  }

  static get RequestHeaders(): typeof RequestHeaders {
    try {
      return Api.RequestParts.RequestHeaders;
    } catch (e) {
      throw new Error(
        `Api: get RequestHeaders: error getting RequestHeaders: \n${e}`,
      );
    }
  }

  static get RequestBody(): typeof RequestBody {
    try {
      return Api.RequestParts.RequestBody;
    } catch (e) {
      throw new Error(
        `Api: get RequestBody: error getting RequestBody: \n${e}`,
      );
    }
  }

  static get ResponseParts(): typeof ResponseParts {
    try {
      return Api.ApiParts.ResponseParts;
    } catch (e) {
      throw new Error(
        `Api: get ResponseParts: error getting ResponseParts: \n${e}`,
      );
    }
  }

  static get ResponseBody(): typeof ResponseBody {
    try {
      return Api.ResponseParts.ResponseBody;
    } catch (e) {
      throw new Error(
        `Api: get ResponseBody: error getting ResponseBody: \n${e}`,
      );
    }
  }

  static get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    try {
      return importModule("./common/types/numbers/PositiveFiniteInteger");
    } catch (e) {
      throw new Error(
        `Api: get PositiveFiniteInteger: error getting PositiveFiniteInteger: \n${e}`,
      );
    }
  }
}

namespace Api {
  export enum Method {
    GET,
    POST,
    PUT,
    DELETE,
  }

  export enum AuthScheme {
    Bearer,
    Basic,
    Digest,
  }
}

module.exports = Api;

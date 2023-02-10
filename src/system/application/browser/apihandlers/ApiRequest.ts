class ApiRequest {

  url: Types.stringful;
  method: ApiRequest.Method;
  private readonly _headers: RequestHeaders;
  private _body: RequestBody;
  private _timeoutSeconds: number = 30;

  constructor(
    url: Types.stringful,
    method: ApiRequest.Method = ApiRequest.Method.GET,
    authHeader?:
      | [string, string]
      | string
      | {
        authType: string,
        authToken: string
      },
    headers?: RequestHeaders.Input,
    body?:
      | string
      | RequestBody.RequestBodyInterface,
    timeoutSeconds?: number
  ) {
    this.url = url;
    this.method = method;
    this._headers = authHeader === undefined ?
      new ApiRequest._RequestHeaders(
        headers
      )
      : typeof authHeader === "string" ?
        new ApiRequest._RequestHeaders(
          authHeader,
          headers
        )
        : Array.isArray(authHeader) ?
          new ApiRequest._RequestHeaders(
            authHeader[0],
            authHeader[1],
            headers
          )
          : new ApiRequest._RequestHeaders(
            authHeader.authType,
            authHeader.authToken,
            headers
          );
    this._body = new ApiRequest._RequestBody(
      body
    );
    if (timeoutSeconds !== undefined)
      this.timeout = timeoutSeconds;
  }

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

  get auth(): string {
    return this._headers.auth;
  }

  set auth(
    authHeader: string
  ) {
    this._headers.auth = authHeader;
  }

  setAuthTypeAndToken(
    ...auth: Parameters<RequestHeaders["setAuthTypeAndToken"]>
  ): this {
    this._headers.setAuthTypeAndToken(...auth);
    return this;
  }

  deleteAuth(): this {
    this._headers.deleteAuth();
    return this;
  }

  get keys(): typeof RequestHeaders.prototype.keys {
    return this._headers.keys;
  }

  get headers(): typeof RequestHeaders.prototype.headers {
    return this._headers.headers;
  }

  get headersObject(): ReturnType<RequestHeaders["toObject"]> {
    return this._headers.toObject();
  }

  get headersStringObject(): ReturnType<RequestHeaders["toStringObject"]> {
    return this._headers.toStringObject();
  }

  get headersString(): ReturnType<RequestHeaders["toString"]> {
    return this._headers.toString();
  }

  set(
    ...header: Parameters<RequestHeaders["set"]>
  ): this {
    this._headers.set(...header);
    return this;
  }

  delete(
    ...header: Parameters<RequestHeaders["delete"]>
  ): this {
    this._headers.delete(...header);
    return this;
  }

  add(
    ...headers: Parameters<RequestHeaders["add"]>
  )
    : this {
    this._headers.add(...headers);
    return this;
  }

  get body(): typeof ApiRequest.prototype.bodyObject {
    return this.bodyObject;
  }

  set body(
    body: string | RequestBody.RequestBodyInterface
  ) {
    this._body = new ApiRequest._RequestBody(body);
  }

  get bodyObject(): ReturnType<RequestBody["toObject"]> {
    return this._body.toObject();
  }

  get bodyStringObject(): ReturnType<RequestBody["toStringObject"]> {
    return this._body.toStringObject();
  }

  get bodyString(): ReturnType<RequestBody["toString"]> {
    return this._body.toString();
  }

  get timeout(): number {
    return this._timeoutSeconds;
  }

  set timeout(timeoutSeconds: number) {
    if (new ApiRequest._PositiveFiniteInteger(timeoutSeconds).isNumber)
      this._timeoutSeconds = timeoutSeconds;
  }

}

namespace ApiRequest {

  export enum Method {
    GET,
    POST,
    PUT
  }

  export const _RequestHeaders: typeof RequestHeaders = importModule("requestparts/RequestHeaders");

  export const _RequestBody: typeof RequestBody = importModule("requestparts/RequestBody");

  export const _PositiveFiniteInteger: typeof PositiveFiniteInteger = importModule("./system/application/common/primitives/numbers/PositiveFiniteInteger");

}

module.exports = ApiRequest;

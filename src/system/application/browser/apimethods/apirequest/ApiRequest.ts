class ApiRequest {

  url: Types.stringful;
  private _headers: RequestHeaders;
  private _body: RequestBody;
  private _timeoutSeconds: number = 30;

  constructor(
    url: Types.stringful,
    authHeader?:
      | [string, string]
      | string
      | {
        authType: string,
        authToken: string
      },
    headers?:
      | [string, Types.primitive]
      | [string, Types.primitive][]
      | { [key: string]: Types.primitive },
    body?:
      | string
      | RequestBody.RequestBodyInterface,
    timeoutSeconds?: number
  ) {
    this.url = url;
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

  request(): string {
    var response: string = "";
    const req: Request = new Request(this.url);
    req.headers = this._headers.toObject();
    req.body = this.apiRequest.body;
    req.method = this.method;
    req.timeoutInterval = this.timeoutSeconds;
    req.loadString().then((_response) => {
      response = _response ?? "";
    }
    );
    return response;
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

  export const _RequestHeaders: typeof RequestHeaders = importModule("requestparts/RequestHeaders");

  export const _RequestBody: typeof RequestBody = importModule("requestparts/RequestBody");

  export const _PositiveFiniteInteger: typeof PositiveFiniteInteger = importModule("./system/application/common/primitives/numbers/PositiveFiniteInteger");

}

module.exports = ApiRequest;

class ApiRequest {
  url: string;
  private _headers: RequestHeaders;
  private _body: RequestBody;
  private _timeoutSeconds: number;
  constructor(
    url: string,
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
    timeoutSeconds?: null | undefined | number
  ) {
    this.url = url;
    this._headers = authHeader === undefined ?
      new ApiRequest._RequestHeaders(headers)
      : typeof authHeader === "string" ?
        new ApiRequest._RequestHeaders(authHeader, headers)
        : Array.isArray(authHeader) ?
          new ApiRequest._RequestHeaders(authHeader[0], authHeader[1], headers)
          : new ApiRequest._RequestHeaders(authHeader.authType, authHeader.authToken, headers);

    const defaultTimeoutSeconds: number = 30;
    this.headers = new ApiRequest._RequestHeaders(headers);
    if (authHeader !== undefined) {
      this.headers.add(authHeader);
    }
    this.body = new ApiRequest._RequestBody(body);
    this._timeoutSeconds = new ApiRequest._PositiveFiniteInteger(timeoutSeconds ?? defaultTimeoutSeconds).isFinite ?
      timeoutSeconds ?? defaultTimeoutSeconds
      : defaultTimeoutSeconds;
  }

  request(): string {
    const req: Request = new Request(this.url);
    req.headers = this.apiRequest.headers;
    req.body = this.apiRequest.body;
    req.method = this.method;
    req.timeoutInterval = this.timeoutSeconds;
    var response: string = "";
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
    this._timeoutSeconds = new ApiRequest._PositiveFiniteInteger(timeoutSeconds).isFinite ?
      timeoutSeconds
      : this._timeoutSeconds;
  }
}

namespace ApiRequest {
  export const _RequestHeaders: typeof RequestHeaders = importModule("requestparts/RequestHeaders");

  export const _RequestBody: typeof RequestBody = importModule("requestparts/RequestBody");

  export const _PositiveFiniteInteger: typeof PositiveFiniteInteger = importModule("./system/application/common/primitives/numbers/PositiveFiniteInteger");
}

module.exports = ApiRequest;

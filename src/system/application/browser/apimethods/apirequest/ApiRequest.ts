class ApiRequest {
  url: string;
  headers: RequestHeaders;
  body: RequestBody;
  private _timeoutSeconds: number;
  constructor(
    url?: null | string,
    authHeader?:
      | [string, string]
      | AuthRequestHeader,
    headers?:
      | [string, string | number | boolean]
      | [string, string | number | boolean][]
      | RequestHeader
      | RequestHeader[]
      | RequestHeaders
      | { [key: string]: string | number | boolean },
    body?:
      | string
      | RequestBody.RequestBodyInterface,
    timeoutSeconds?: null | undefined | number
  ) {
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

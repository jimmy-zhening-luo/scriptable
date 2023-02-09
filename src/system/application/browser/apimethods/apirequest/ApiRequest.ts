class ApiRequest {
  readonly headers: RequestHeaders;
  readonly body: RequestBody;

  constructor(
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
      | any
  ) {
    this.headers = new ApiRequest._RequestHeaders(headers);
    if (authHeader !== undefined) {
      this.headers.add(authHeader);
    }
    this.body = new ApiRequest._RequestBody(body);
  }
}

namespace ApiRequest {
  export const _RequestHeaders: typeof RequestHeaders = importModule("requestparts/RequestHeaders");

  export const _RequestBody: typeof RequestBody = importModule("requestparts/RequestBody");
}

module.exports = ApiRequest;

abstract class HttpMethod {

  readonly apiRequest: ApiRequest;

  constructor(
    url: Types.stringful,
    method: Types.stringful,
    authHeader?: any,
    headers?: any,
    body?: any,
    timeoutSeconds?: number
  ) {
    this.apiRequest = new HttpMethod._ApiRequest(
      url,
      method,
      authHeader,
      headers,
      body,
      timeoutSeconds
    );
  }

  get method(): string {
    return this.apiRequest.method;
  }

  set method(
    method: string
  ) {
    this.apiRequest.method = method;
  }

  get timeout(): number {
    return this.apiRequest.timeout;
  }

  set timeout(
    timeoutSeconds: number
  ) {
    this.apiRequest.timeout = timeoutSeconds;
  }

  get url(): string {
    return this.apiRequest.url;
  }

  set url(
    url: string
  ) {
    this.apiRequest.url = url;
  }

  request(): string {
    return "";
  }
}

namespace HttpMethod {

  export const _ApiRequest: typeof ApiRequest = importModule("./system/application/browser/apimethods/apirequest/ApiRequest");

  export const _ApiResponse: typeof ApiResponse = importModule("./system/application/browser/apimethods/apiresponse/ApiResponse");
}

module.exports = HttpMethod;

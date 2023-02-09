abstract class HttpMethod {

  readonly url: string;
  readonly apiRequest: ApiRequest;
  constructor(
    url?: null | string,
    headers?: any,
    body?: any,
    timeoutSeconds?: number
  ) {
    this.url = url ?? "";
    this.apiRequest = new HttpMethod._ApiRequest(headers, body);

  }

  abstract get method(): string;

  request(): string {
    return "";
  }
}

namespace HttpMethod {

  export const _ApiRequest: typeof ApiRequest = importModule("./system/application/browser/apimethods/apirequest/ApiRequest");

  export const _ApiResponse: typeof ApiResponse = importModule("./system/application/browser/apimethods/apiresponse/ApiResponse");
}

module.exports = HttpMethod;

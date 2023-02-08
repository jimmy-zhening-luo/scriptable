abstract class HttpMethod {
  readonly url: string;
  readonly apiRequest: ApiRequest;
  readonly timeoutSeconds: number;

  constructor(
    url: string,
    apiRequest?: ApiRequest,
    timeoutSeconds: number = 30
  ) {
    this.url = new HttpMethod._Url(url);
    this.apiRequest = apiRequest ?? new ApiRequest();
    this.timeoutSeconds = timeoutSeconds;
  }

  abstract get method(): string;

  request(): ApiResponse {
    const req: Request = new Request(this.url);
    req.headers = this.apiRequest.headers;
    req.body = this.apiRequest.body;
    req.method = this.method;
    req.timeoutInterval = this.timeoutSeconds;
    var response: string = "";
    req.loadString().then((_response: string) => {
      response = _response;
    }
    );

    return new ApiResponse(response);
  }
}

namespace HttpMethod {
  export const _Url: typeof Url = importModule("./system/application/browser/Url");
}

module.exports = HttpMethod;

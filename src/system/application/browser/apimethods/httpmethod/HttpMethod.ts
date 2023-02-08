abstract class HttpMethod {
  readonly url: Url;
  readonly apiRequest: ApiRequest;
  readonly method: string;
  readonly timeoutSeconds: number;

  constructor(
    url: 
      | string
      | Url
      | Url.UrlParts,
    apiRequest?: ApiRequest,
    method: string = "GET",
    timeoutSeconds: number = 30
  ) {
    this.url = new HttpMethod._Url(url);
    this.apiRequest = apiRequest ?? new ApiRequest();
    this.method = method;
    this.timeoutSeconds = timeoutSeconds;
  }

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

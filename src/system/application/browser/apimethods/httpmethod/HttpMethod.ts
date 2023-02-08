abstract class HttpMethod {
  readonly url: string;
  readonly apiRequest: ApiRequest;
  readonly method: string;
  readonly timeoutSeconds: number;

  constructor(
    url: string,
    apiRequest?: ApiRequest,
    method: string = "GET",
    timeoutSeconds: number = 30
  ) {
    this.url = url;
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

}

module.exports = HttpMethod;

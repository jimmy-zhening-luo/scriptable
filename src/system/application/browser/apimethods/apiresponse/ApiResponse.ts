class ApiResponse {
  readonly responseBody: ResponseBody;

  constructor(
    response?: any
  ) {
    this.responseBody = response === undefined || response === null ?
      new ApiResponse._StringResponseBody("")
      : new ApiResponse._JsonResponseBody(response).response.toString() === "{}" ?
        new ApiResponse._StringResponseBody(response)
        : new ApiResponse._JsonResponseBody(response);
  }

  get response(): any {
    return this.responseBody.response;
  }

  toObject(): any {
    return typeof this.responseBody.response === "string" ? JSON.parse(this.responseBody.response) : this.responseBody.response;
  }

  toString(): string {
    return typeof this.responseBody.response === "string" ? this.responseBody.response : JSON.stringify(this.responseBody.response);
  }
}

namespace ApiResponse {
  export const _JsonResponseBody: typeof JsonResponseBody = importModule("responseparts/JsonResponseBody");

  export const _StringResponseBody: typeof StringResponseBody = importModule("responseparts/StringResponseBody");

  export const _ResponseBody: typeof ResponseBody = importModule("responseparts/responsebody/ResponseBody");
}

module.exports = ApiResponse;

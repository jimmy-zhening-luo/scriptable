class ApiResponse {
  readonly responseBody: ResponseBody;

  constructor(
    response?: any
  ) {
    this.responseBody = new ApiResponse._ResponseBody(response);
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

  export const _ResponseBody: typeof ResponseBody = importModule("responseparts/ResponseBody");

}

module.exports = ApiResponse;

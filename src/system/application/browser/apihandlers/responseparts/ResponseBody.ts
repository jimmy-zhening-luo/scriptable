class ResponseBody {
  response: any;

  constructor(
    response?:
      | null
      | string
      | any
  ) {
    this.response = this.parseResponse(response);
  }

  parseResponse(
    response?: any
  ): any {
    return response;
  }
}

module.exports = ResponseBody;

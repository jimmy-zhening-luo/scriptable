class ResponseBody {
  response;

  constructor(
    response?:
      | null
      | string
      | any
  ) {
    this.response = this.parseResponse(response);
  }

  parseResponse(
    response?:
      | null
      | string
      | any
  ): any {
    return null;
  }
}

module.exports = ResponseBody;

abstract class ResponseBody {
  response;

  constructor(
    response?:
      | null
      | string
      | any
  ) {
    this.response = this.parseResponse(response);
  }

  abstract parseResponse(
    response?:
      | null
      | string
      | any
  ): any;
}

module.exports = ResponseBody;

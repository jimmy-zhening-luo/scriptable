const st_ResponseBody: typeof ResponseBody = importModule("responsebody/ResponseBody");

class StringResponseBody extends st_ResponseBody {

  constructor(response?: null | string) {
    super(response);
  }

  parseResponse(response?: null | string): string {
    return (response === null || response === undefined) ?
      ""
      : response;
  }

}

module.exports = StringResponseBody;

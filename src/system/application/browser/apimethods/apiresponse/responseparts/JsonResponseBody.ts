const js_ResponseBody: typeof ResponseBody = importModule("responsebody/ResponseBody");

class JsonResponseBody extends js_ResponseBody {
  override response: any;

  constructor(response?: null | string | any) {
    super(response);
  }

  parseResponse(response?: null | string | any): any {
    try {
      const json: any = response === null || response === undefined ?
        {}
        : JSON.parse(response);
      return json;
    } catch (e) {
      return {};
    };
  }
}

module.exports = JsonResponseBody;

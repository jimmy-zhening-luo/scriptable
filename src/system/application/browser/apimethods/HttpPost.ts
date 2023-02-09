const po_HttpMethod: typeof HttpMethod = importModule("httpmethod/HttpMethod");

class HttpPost extends po_HttpMethod {
  protected readonly override method: Types.stringful = "POST";
}

module.exports = HttpPost;

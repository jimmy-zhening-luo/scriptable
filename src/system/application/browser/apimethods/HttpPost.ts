const po_HttpMethod: typeof HttpMethod = importModule("httpmethod/HttpMethod");

class HttpPost extends po_HttpMethod {
  get method(): string {
    return "POST";
  }
}

module.exports = HttpPost;

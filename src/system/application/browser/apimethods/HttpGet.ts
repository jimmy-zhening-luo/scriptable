const ge_HttpMethod: typeof HttpMethod = importModule("httpmethod/HttpMethod");

class HttpGet extends ge_HttpMethod {
  get method(): string {
    return "GET";
  }
}

module.exports = HttpGet;

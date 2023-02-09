const pu_HttpMethod: typeof HttpMethod = importModule("httpmethod/HttpMethod");

class HttpPut extends pu_HttpMethod {
  protected readonly override method: Types.stringful = "PUT";
}

module.exports = HttpPut;

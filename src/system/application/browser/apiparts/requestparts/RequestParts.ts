class RequestParts {
  static get RequestBody(): typeof RequestBody {
    return importModule("RequestBody") as typeof RequestBody;
  }

  static get RequestHeaders(): typeof RequestHeaders {
    return importModule("RequestHeaders") as typeof RequestHeaders;
  }
}

module.exports = RequestParts;

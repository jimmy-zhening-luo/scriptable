class RequestParts {
  static get RequestBody(): typeof RequestBody {
    return importModule("RequestBody");
  }

  static get RequestHeaders(): typeof RequestHeaders {
    return importModule("RequestHeaders");
  }
}

module.exports = RequestParts;

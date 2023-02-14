class RequestParts {

  static get RequestBody(): typeof RequestBody {
    return importModule("RequestBody");
  }

  static get RequestHeaders(): typeof RequestHeaders {
    return importModule("RequestHeaders");
  }

  static get RequestHeaderTypes(): typeof RequestHeaderTypes {
    return RequestParts.RequestHeaders.RequestHeaderTypes;
  }

  static get AuthRequestHeader(): typeof AuthRequestHeader {
    return RequestParts.RequestHeaders.AuthRequestHeader;
  }

  static get GenericRequestHeader(): typeof GenericRequestHeader {
    return RequestParts.RequestHeaders.GenericRequestHeader;
  }

}

module.exports = RequestParts;

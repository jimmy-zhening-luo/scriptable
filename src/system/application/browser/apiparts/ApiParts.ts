class ApiParts {

  static get RequestParts(): typeof RequestParts {
    return importModule("requestparts/RequestParts");
  }

  static get RequestHeaders(): typeof RequestHeaders {
    return this.RequestParts.RequestHeaders;
  }

  static get RequestBody(): typeof RequestBody {
    return this.RequestParts.RequestBody;
  }

  static get ResponseParts(): typeof ResponseParts {
    return importModule("responseparts/ResponseParts");
  }

  static get ResponseBody(): typeof ResponseBody {
    return this.ResponseParts.ResponseBody;
  }

}

module.exports = ApiParts;

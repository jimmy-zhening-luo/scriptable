class ApiParts {
  static get RequestParts(): typeof RequestParts {
    return importModule("requestparts/RequestParts");
  }

  static get ResponseParts(): typeof ResponseParts {
    return importModule("responseparts/ResponseParts");
  }
}

module.exports = ApiParts;

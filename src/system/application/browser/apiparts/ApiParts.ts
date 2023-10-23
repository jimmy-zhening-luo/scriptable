class ApiParts {
  static get RequestParts(): typeof RequestParts {
    return importModule("requestparts/RequestParts") as typeof RequestParts;
  }

  static get ResponseParts(): typeof ResponseParts {
    return importModule("responseparts/ResponseParts") as typeof ResponseParts;
  }
}

module.exports = ApiParts;

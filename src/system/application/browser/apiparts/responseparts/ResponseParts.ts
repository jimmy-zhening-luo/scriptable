class ResponseParts {
  static get ResponseBody(): typeof ResponseBody {
    return importModule("ResponseBody");
  }
}

module.exports = ResponseParts;

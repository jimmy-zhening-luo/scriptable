class ResponseParts {
  static get ResponseBody(): typeof ResponseBody {
    return importModule("ResponseBody") as typeof ResponseBody;
  }
}

module.exports = ResponseParts;

class RequestHeaderTypes {

  static get AuthRequestHeader(): typeof AuthRequestHeader {
    return importModule("AuthRequestHeader");
  }

  static get GenericRequestHeader(): typeof GenericRequestHeader {
    return importModule("GenericRequestHeader");
  }

}

module.exports = RequestHeaderTypes;

class Common {

  static get Types(): typeof Types {
    return importModule("types/Types");
  }

}

module.exports = Common;

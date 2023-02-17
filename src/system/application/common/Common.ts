class Common {

  static get Types(): typeof Types {
    return importModule("primitives/Types");
  }

}

module.exports = Common;

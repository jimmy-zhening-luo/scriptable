class Common {

  static get Paths(): typeof Paths {
    return importModule("paths/Paths");
  }

  static get Types(): typeof Types {
    return importModule("primitives/Types");
  }

}

module.exports = Common;

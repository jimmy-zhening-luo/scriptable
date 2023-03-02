class Common {
  static get Types(): typeof Types {
    try {
      return importModule("types/Types");
    } catch (e) {
      throw new ReferenceError("Common: error importing Types module");
    }
  }
}

module.exports = Common;

const i_Bounds: typeof Bounds = importModule("bounds/Bounds");

class Infinite extends i_Bounds {
  static get Bounds(): typeof Bounds {
    try {
      return i_Bounds;
    } catch (e) {
      throw new ReferenceError("Infinite: error importing Bounds module");
    }
  }
}

module.exports = Infinite;

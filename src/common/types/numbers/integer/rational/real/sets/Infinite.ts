const i_Bounds: typeof Bounds = importModule("bounds/Bounds");

class Infinite extends i_Bounds {
  static get Bounds(): typeof Bounds {
    return i_Bounds;
  }
}

module.exports = Infinite;

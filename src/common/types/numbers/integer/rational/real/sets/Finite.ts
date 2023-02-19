const f_Bounds: typeof Bounds = importModule("bounds/Bounds");

class Finite extends f_Bounds {

  override isBounded(value: number): boolean {
    return super.isBounded(value)
      && value !== Infinity
      && value !== -Infinity;
  }

  static get Bounds(): typeof Bounds {
    return f_Bounds;
  }

}

module.exports = Finite;

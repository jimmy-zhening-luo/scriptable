const f_Bounds: typeof Bounds = importModule("bounds/Bounds");

class Finite extends f_Bounds {
  override isBounded(value: number): boolean {
    try {
      return (
        super.isBounded(value) && value !== Infinity && value !== -Infinity
      );
    } catch (e) {
      throw new ReferenceError("Finite: error calling isBounded");
    }
  }

  static get Bounds(): typeof Bounds {
    try {
      return f_Bounds;
    } catch (e) {
      throw new ReferenceError("Finite: error importing Bounds module");
    }
  }
}

module.exports = Finite;

const f_Bounds: typeof Bounds = importModule("bounds/Bounds") as typeof Bounds;

class Finite extends f_Bounds {
  public static get Bounds(): typeof Bounds {
    try {
      return f_Bounds;
    }
    catch (e) {
      throw new ReferenceError("Finite: error importing Bounds module");
    }
  }

  public override isBounded(value: number): boolean {
    try {
      return (
        super.isBounded(value) && value !== Infinity && value !== -Infinity
      );
    }
    catch (e) {
      throw new EvalError("Finite: error calling isBounded");
    }
  }
}

module.exports = Finite;

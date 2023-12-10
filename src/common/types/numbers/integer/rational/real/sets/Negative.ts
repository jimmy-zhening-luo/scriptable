const n_Cardinality: typeof Cardinality = importModule(
  "cardinality/Cardinality",
) as typeof Cardinality;

class Negative extends n_Cardinality {
  public static get Cardinality(): typeof Cardinality {
    try {
      return n_Cardinality;
    }
    catch (e) {
      throw new ReferenceError("Negative: error importing Cardinality module");
    }
  }

  public override isCardinal(value: number): boolean {
    try {
      return (
        super.isCardinal(value) && (value === 0 || value === -0 || value < 0)
      );
    }
    catch (e) {
      throw new EvalError("Negative: error calling isCardinal");
    }
  }
}

module.exports = Negative;

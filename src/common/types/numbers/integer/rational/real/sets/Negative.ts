const n_Cardinality: typeof Cardinality = importModule(
  "cardinality/Cardinality",
);

class Negative extends n_Cardinality {
  override isCardinal(value: number): boolean {
    try {
      return (
        super.isCardinal(value) && (value === 0 || value === -0 || value < 0)
      );
    } catch (e) {
      throw new Error("Negative: error calling isCardinal");
    }
  }

  static get Cardinality(): typeof Cardinality {
    try {
      return n_Cardinality;
    } catch (e) {
      throw new ReferenceError("Negative: error importing Cardinality module");
    }
  }
}

module.exports = Negative;

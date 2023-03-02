const n_Cardinality: typeof Cardinality = importModule(
  "cardinality/Cardinality",
);

class Negative extends n_Cardinality {
  override isCardinal(value: number): boolean {
    return (
      super.isCardinal(value) && (value === 0 || value === -0 || value < 0)
    );
  }

  static get Cardinality(): typeof Cardinality {
    return n_Cardinality;
  }
}

module.exports = Negative;

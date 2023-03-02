const p_Cardinality: typeof Cardinality = importModule(
  "cardinality/Cardinality",
);

class Positive extends p_Cardinality {
  override isCardinal(value: number): boolean {
    return (
      super.isCardinal(value) && (value === 0 || value === -0 || value > 0)
    );
  }

  static get Cardinality(): typeof Cardinality {
    return p_Cardinality;
  }
}

module.exports = Positive;

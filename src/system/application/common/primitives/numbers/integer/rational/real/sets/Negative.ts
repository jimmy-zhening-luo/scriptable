const n_Cardinality: typeof Cardinality = importModule("cardinality/Cardinality");

class Negative extends n_Cardinality {

  override isCardinal(
    value: undefined | null | number
  ): boolean {
    return super.isCardinal(value)
      && (
        value as number === 0
        || value as number === -0
        || value as number < 0
      );
  }

  static get Cardinality(): typeof Cardinality {
    return n_Cardinality
  }

}

module.exports = Negative;

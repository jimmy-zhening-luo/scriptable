const p_Cardinality: typeof Cardinality = importModule("cardinality/Cardinality");

class Positive extends p_Cardinality {
  override isCardinal(
    value: undefined | null | number
  ): boolean {
    return super.isCardinal(value)
      && (
        value as number === 0
        || value as number === -0
        || value as number > 0
      );
  }
}

module.exports = Positive;

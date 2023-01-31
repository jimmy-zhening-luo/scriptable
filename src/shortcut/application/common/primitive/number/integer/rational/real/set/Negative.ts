class NegativeCardinality extends Cardinality {
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
}

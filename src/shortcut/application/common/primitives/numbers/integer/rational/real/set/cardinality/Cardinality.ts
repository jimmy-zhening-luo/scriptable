abstract class Cardinality {
  isCardinal(
    value: undefined | null | number
  ): boolean {
    return value !== undefined
      && value !== null
      && !Number.isNaN(value);
  }
}

module.exports = Cardinality;
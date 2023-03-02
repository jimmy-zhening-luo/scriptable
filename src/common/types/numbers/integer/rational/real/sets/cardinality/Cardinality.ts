abstract class Cardinality {
  isCardinal(value: number): boolean {
    return !Number.isNaN(value);
  }
}

module.exports = Cardinality;

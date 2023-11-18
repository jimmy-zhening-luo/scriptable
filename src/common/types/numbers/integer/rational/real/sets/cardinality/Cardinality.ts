abstract class Cardinality {
  isCardinal(value: number): boolean {
    try {
      return !Number.isNaN(value);
    }
    catch (e) {
      throw new EvalError("Cardinality: error calling isCardinal");
    }
  }
}

module.exports = Cardinality;

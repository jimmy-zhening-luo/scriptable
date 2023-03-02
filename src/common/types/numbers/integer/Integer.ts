const _Rational: typeof Rational = importModule("rational/Rational");

class Integer extends _Rational {
  protected override qualifies(value: number): boolean {
    try {
      return super.qualifies(value) && Integer.Rational.isInteger(value);
    } catch (e) {
      throw new Error(`Integer.qualifies: ${e}`);
    }
  }

  static get Rational(): typeof Rational {
    try {
      return _Rational;
    } catch (e) {
      throw new ReferenceError(
        `Integer: error loading parent Rational module: ${e}`,
      );
    }
  }
}

module.exports = Integer;

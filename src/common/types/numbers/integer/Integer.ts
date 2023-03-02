const _Rational: typeof Rational = importModule("rational/Rational");

class Integer extends _Rational {
  protected override qualifies(value: number): boolean {
    return super.qualifies(value) && Integer.Rational.isInteger(value);
  }

  static get Rational(): typeof Rational {
    return _Rational;
  }
}

module.exports = Integer;

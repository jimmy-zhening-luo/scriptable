const _Rational: typeof Rational = importModule("rational/Rational");

class Integer extends _Rational {
  protected override qualifies(value: number): boolean {
    return super.qualifies(value)
      && Number.isInteger(value);
  }
}

module.exports = Integer;
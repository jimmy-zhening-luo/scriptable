class Integer extends Rational {
  protected override qualifies(value: number): boolean {
    return super.qualifies(value)
      && Number.isInteger(value);
  }
}

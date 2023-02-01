class PositiveFiniteInteger extends Integer {
  constructor(value: number | Rational) {
    super(
      value,
      new Positive(),
      new Finite()
    );
  }
}

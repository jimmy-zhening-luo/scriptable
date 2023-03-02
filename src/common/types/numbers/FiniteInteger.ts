const f_Integer: typeof Integer = importModule("integer/Integer");

class FiniteInteger extends f_Integer {
  override bounds: Bounds = new FiniteRational.Bounds.Finite();

  static get Integer(): typeof Integer {
    return f_Integer;
  }
}

module.exports = FiniteInteger;

const f_Integer: typeof Integer = importModule("integer/Integer");

class FiniteInteger extends f_Integer {
  override bounds: Bounds = new FiniteRational.Bounds.Finite();

  static get Integer(): typeof Integer {
    try {
      return f_Integer;
    } catch (e) {
      throw new ReferenceError(
        `FiniteInteger: error loading parent Integer module: ${e}`,
      );
    }
  }
}

module.exports = FiniteInteger;

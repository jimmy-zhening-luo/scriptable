class Numbers {
  static get Real(): typeof Real {
    try {
      return Numbers.Rational.Real;
    } catch (e) {
      throw new ReferenceError(`Numbers: error loading Real module: \n${e}`);
    }
  }

  static get Sets(): typeof Sets {
    try {
      return Numbers.Real.Sets;
    } catch (e) {
      throw new ReferenceError(`Numbers: error loading Sets module: \n${e}`);
    }
  }

  static get Bounds(): typeof Sets.Bounds {
    try {
      return Numbers.Sets.Bounds;
    } catch (e) {
      throw new ReferenceError(`Numbers: error loading Bounds module: \n${e}`);
    }
  }

  static get Cardinality(): typeof Sets.Cardinality {
    try {
      return Numbers.Sets.Cardinality;
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading Cardinality module: \n${e}`,
      );
    }
  }

  static get Rational(): typeof Rational {
    try {
      return Numbers.Integer.Rational;
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading Rational module: \n${e}`,
      );
    }
  }

  static get FiniteRational(): typeof FiniteRational {
    try {
      return importModule("FiniteRational");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading FiniteRational module: \n${e}`,
      );
    }
  }

  static get Integer(): typeof Integer {
    try {
      return importModule("integer/Integer");
    } catch (e) {
      throw new ReferenceError(`Numbers: error loading Integer module: \n${e}`);
    }
  }

  static get FiniteInteger(): typeof FiniteInteger {
    try {
      return importModule("FiniteInteger");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading FiniteInteger module: \n${e}`,
      );
    }
  }

  static get PositiveRational(): typeof PositiveRational {
    try {
      return importModule("PositiveRational");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading PositiveRational module: \n${e}`,
      );
    }
  }

  static get NegativeRational(): typeof NegativeRational {
    try {
      return importModule("NegativeRational");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading NegativeRational module: \n${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return importModule("PositiveInteger");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading PositiveInteger module: \n${e}`,
      );
    }
  }

  static get NegativeInteger(): typeof NegativeInteger {
    try {
      return importModule("NegativeInteger");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading NegativeInteger module: \n${e}`,
      );
    }
  }

  static get PositiveFiniteRational(): typeof PositiveFiniteRational {
    try {
      return importModule("PositiveFiniteRational");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading PositiveFiniteRational module: \n${e}`,
      );
    }
  }

  static get NegativeFiniteRational(): typeof NegativeFiniteRational {
    try {
      return importModule("NegativeFiniteRational");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading NegativeFiniteRational module: \n${e}`,
      );
    }
  }

  static get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    try {
      return importModule("PositiveFiniteInteger");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading PositiveFiniteInteger module: \n${e}`,
      );
    }
  }

  static get NegativeFiniteInteger(): typeof NegativeFiniteInteger {
    try {
      return importModule("NegativeFiniteInteger");
    } catch (e) {
      throw new ReferenceError(
        `Numbers: error loading NegativeFiniteInteger module: \n${e}`,
      );
    }
  }
}

module.exports = Numbers;

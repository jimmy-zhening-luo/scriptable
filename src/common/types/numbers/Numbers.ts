class Numbers {
  static get Real(): typeof Real {
    return Numbers.Rational.Real;
  }

  static get Sets(): typeof Sets {
    return Numbers.Real.Sets;
  }

  static get Bounds(): typeof Sets.Bounds {
    return Numbers.Sets.Bounds;
  }

  static get Cardinality(): typeof Sets.Cardinality {
    return Numbers.Sets.Cardinality;
  }

  static get Rational(): typeof Rational {
    return Numbers.Integer.Rational;
  }

  static get FiniteRational(): typeof FiniteRational {
    return importModule("FiniteRational");
  }

  static get Integer(): typeof Integer {
    return importModule("integer/Integer");
  }

  static get FiniteInteger(): typeof FiniteInteger {
    return importModule("FiniteInteger");
  }

  static get PositiveRational(): typeof PositiveRational {
    return importModule("PositiveRational");
  }

  static get NegativeRational(): typeof NegativeRational {
    return importModule("NegativeRational");
  }

  static get PositiveInteger(): typeof PositiveInteger {
    return importModule("PositiveInteger");
  }

  static get NegativeInteger(): typeof NegativeInteger {
    return importModule("NegativeInteger");
  }

  static get PositiveFiniteRational(): typeof PositiveFiniteRational {
    return importModule("PositiveFiniteRational");
  }

  static get NegativeFiniteRational(): typeof NegativeFiniteRational {
    return importModule("NegativeFiniteRational");
  }

  static get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    return importModule("PositiveFiniteInteger");
  }

  static get NegativeFiniteInteger(): typeof NegativeFiniteInteger {
    return importModule("NegativeFiniteInteger");
  }
}

module.exports = Numbers;

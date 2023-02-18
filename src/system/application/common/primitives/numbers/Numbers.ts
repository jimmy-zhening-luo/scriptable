class Numbers {

  static get PositiveFiniteInteger(): typeof PositiveFiniteInteger {
    return importModule("PositiveFiniteInteger");
  }

  static get PositiveInteger(): typeof PositiveInteger {
    return importModule("PositiveInteger");
  }

  static get Integer(): typeof Integer {
    return Numbers.PositiveInteger.Integer;
  }

  static get Rational(): typeof Rational {
    return Numbers.Integer.Rational;
  }

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

}

module.exports = Numbers;

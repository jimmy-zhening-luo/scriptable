const pf_Integer: typeof Integer = importModule("integer/Integer");

class PositiveFiniteInteger extends pf_Integer {
  constructor(value: number | Rational) {
    super(
      value,
      new PositiveFiniteInteger._Positive(),
      new PositiveFiniteInteger._Finite()
    );
  }
}

namespace PositiveFiniteInteger {
  export const _Positive: typeof Positive = importModule("integer/rational/real/set/Positive");
  
  export const _Finite: typeof Finite = importModule("integer/rational/real/set/Finite");
}

module.exports = PositiveFiniteInteger;

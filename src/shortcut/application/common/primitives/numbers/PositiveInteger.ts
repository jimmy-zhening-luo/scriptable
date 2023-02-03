const p_Integer: typeof Integer = importModule("integer/Integers");

class PositiveInteger extends p_Integer {
  constructor(value: number | Rational) {
    super(
      value,
      new PositiveInteger._Positive()
    );
  }
}

namespace PositiveInteger {
  export const _Positive: typeof Positive = importModule("integer/rational/real/set/Positive");
}

module.exports = PositiveInteger;
const pf_Integer = importModule("integer/Integers");
class PositiveFiniteInteger extends pf_Integer {
    constructor(value) {
        super(value, new PositiveFiniteInteger._Positive(), new PositiveFiniteInteger._Finite());
    }
}
(function (PositiveFiniteInteger) {
    PositiveFiniteInteger._Positive = importModule("integer/rational/real/set/Positive");
    PositiveFiniteInteger._Finite = importModule("integer/rational/real/set/Finite");
})(PositiveFiniteInteger || (PositiveFiniteInteger = {}));
module.exports = PositiveFiniteInteger;
//# sourceMappingURL=PositiveFiniteInteger.js.map
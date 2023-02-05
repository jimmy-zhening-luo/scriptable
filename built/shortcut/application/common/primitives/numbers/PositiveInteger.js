const p_Integer = importModule("integer/Integers");
class PositiveInteger extends p_Integer {
    constructor(value) {
        super(value, new PositiveInteger._Positive());
    }
}
(function (PositiveInteger) {
    PositiveInteger._Positive = importModule("integer/rational/real/set/Positive");
})(PositiveInteger || (PositiveInteger = {}));
module.exports = PositiveInteger;
//# sourceMappingURL=PositiveInteger.js.map
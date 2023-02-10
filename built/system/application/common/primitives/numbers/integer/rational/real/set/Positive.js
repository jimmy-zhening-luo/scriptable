const p_Cardinality = importModule("cardinality/Cardinality");
class Positive extends p_Cardinality {
    isCardinal(value) {
        return super.isCardinal(value)
            && (value === 0
                || value === -0
                || value > 0);
    }
}
module.exports = Positive;
//# sourceMappingURL=Positive.js.map
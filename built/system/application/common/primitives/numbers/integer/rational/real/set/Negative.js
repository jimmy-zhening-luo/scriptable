const n_Cardinality = importModule("cardinality/Cardinality");
class Negative extends n_Cardinality {
    isCardinal(value) {
        return super.isCardinal(value)
            && (value === 0
                || value === -0
                || value < 0);
    }
}
module.exports = Negative;
//# sourceMappingURL=Negative.js.map
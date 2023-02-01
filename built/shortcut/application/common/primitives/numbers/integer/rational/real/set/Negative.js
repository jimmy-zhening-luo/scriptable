class Negative extends Cardinality {
    isCardinal(value) {
        return super.isCardinal(value)
            && (value === 0
                || value === -0
                || value < 0);
    }
}
//# sourceMappingURL=Negative.js.map
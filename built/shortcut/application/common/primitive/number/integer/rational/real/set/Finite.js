class Finite extends Bounds {
    isBounded(value) {
        return super.isBounded(value)
            && value !== Infinity
            && value !== -Infinity;
    }
}
//# sourceMappingURL=Finite.js.map
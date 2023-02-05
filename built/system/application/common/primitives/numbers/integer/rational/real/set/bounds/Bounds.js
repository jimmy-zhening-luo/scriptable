class Bounds {
    isBounded(value) {
        return value !== undefined
            && value !== null
            && !Number.isNaN(value);
    }
}
module.exports = Bounds;
//# sourceMappingURL=Bounds.js.map
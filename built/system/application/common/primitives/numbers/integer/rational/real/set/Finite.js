const f_Bounds = importModule("bounds/Bounds");
class Finite extends f_Bounds {
    isBounded(value) {
        return super.isBounded(value)
            && value !== Infinity
            && value !== -Infinity;
    }
}
module.exports = Finite;
//# sourceMappingURL=Finite.js.map
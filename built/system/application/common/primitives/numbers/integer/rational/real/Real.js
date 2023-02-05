class Real {
    constructor(cardinality = new Real._AnyCardinality(), bounds = new Real._Infinite()) {
        this.cardinality = cardinality;
        this.bounds = bounds;
    }
    toNumber() {
        return this.number;
    }
    toString() {
        return this.string;
    }
}
(function (Real) {
    Real._AnyCardinality = importModule("set/AnyCardinality");
    Real._Infinite = importModule("set/Infinite");
})(Real || (Real = {}));
module.exports = Real;
//# sourceMappingURL=Real.js.map
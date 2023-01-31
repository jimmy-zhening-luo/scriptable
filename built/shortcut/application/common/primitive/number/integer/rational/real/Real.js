class Real {
    constructor(cardinality = new AnyCardinality(), bounds = new Infinite()) {
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
//# sourceMappingURL=Real.js.map
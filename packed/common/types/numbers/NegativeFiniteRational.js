"use strict";
const n_FiniteRational = importModule("FiniteRational");
class NegativeFiniteRational extends n_FiniteRational {
    constructor() {
        super(...arguments);
        this.cardinality = new NegativeFiniteRational.Cardinality.Negative();
    }
    static get FiniteRational() {
        try {
            return n_FiniteRational;
        }
        catch (e) {
            throw new ReferenceError(`NegativeFiniteRational: error loading parent FiniteRational module: \n${e}`);
        }
    }
}
module.exports = NegativeFiniteRational;

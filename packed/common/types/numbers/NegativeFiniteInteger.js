"use strict";
const n_FiniteInteger = importModule("FiniteInteger");
class NegativeFiniteInteger extends n_FiniteInteger {
    constructor() {
        super(...arguments);
        this.cardinality = new NegativeFiniteInteger.Cardinality.Negative();
    }
    static get FiniteInteger() {
        try {
            return n_FiniteInteger;
        }
        catch (e) {
            throw new ReferenceError(`NegativeFiniteInteger: error loading parent FiniteInteger module: \n${e}`);
        }
    }
}
module.exports = NegativeFiniteInteger;

"use strict";
const p_FiniteInteger = importModule("FiniteInteger");
class PositiveFiniteInteger extends p_FiniteInteger {
    constructor() {
        super(...arguments);
        this.cardinality = new PositiveFiniteInteger.Cardinality.Positive();
    }
    static get FiniteInteger() {
        try {
            return p_FiniteInteger;
        }
        catch (e) {
            throw new ReferenceError(`PositiveFiniteInteger: error loading parent FiniteInteger module: \n${e}`);
        }
    }
}
module.exports = PositiveFiniteInteger;

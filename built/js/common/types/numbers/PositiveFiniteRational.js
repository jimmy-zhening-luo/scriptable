"use strict";
const p_FiniteRational = importModule("FiniteRational");
class PositiveFiniteRational extends p_FiniteRational {
    constructor() {
        super(...arguments);
        this.cardinality = new PositiveFiniteRational.Cardinality.Positive();
    }
    static get FiniteRational() {
        try {
            return p_FiniteRational;
        }
        catch (e) {
            throw new ReferenceError(`PositiveFiniteRational: error loading parent FiniteRational module: \n${e}`);
        }
    }
}
module.exports = PositiveFiniteRational;

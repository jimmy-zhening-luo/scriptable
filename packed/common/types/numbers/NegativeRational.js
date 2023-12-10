"use strict";
const nr_Integer = importModule("integer/Integer");
class NegativeRational extends nr_Integer.Rational {
    constructor() {
        super(...arguments);
        this.cardinality = new NegativeRational.Cardinality.Negative();
    }
    static get Integer() {
        try {
            return nr_Integer;
        }
        catch (e) {
            throw new ReferenceError(`NegativeRational: error loading parent Integer module: \n${e}`);
        }
    }
    static get Rational() {
        try {
            return NegativeRational.Integer.Rational;
        }
        catch (e) {
            throw new ReferenceError(`NegativeRational: error loading Integer.Rational module: \n${e}`);
        }
    }
}
module.exports = NegativeRational;

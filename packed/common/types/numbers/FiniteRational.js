"use strict";
const fr_Integer = importModule("integer/Integer");
class FiniteRational extends fr_Integer.Rational {
    constructor() {
        super(...arguments);
        this.bounds = new FiniteRational.Bounds.Finite();
    }
    static get Integer() {
        try {
            return fr_Integer;
        }
        catch (e) {
            throw new ReferenceError(`FiniteRational: error loading parent Integer module: \n${e}`);
        }
    }
    static get Rational() {
        try {
            return FiniteRational.Integer.Rational;
        }
        catch (e) {
            throw new ReferenceError(`FiniteRational: error loading Integer.Rational module: \n${e}`);
        }
    }
}
module.exports = FiniteRational;

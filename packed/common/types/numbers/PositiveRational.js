"use strict";
const pr_Integer = importModule("integer/Integer");
class PositiveRational extends pr_Integer.Rational {
    constructor() {
        super(...arguments);
        this.cardinality = new PositiveRational.Cardinality.Positive();
    }
    static get Integer() {
        try {
            return pr_Integer;
        }
        catch (e) {
            throw new ReferenceError(`PositiveRational: error loading parent Integer module: \n${e}`);
        }
    }
    static get Rational() {
        try {
            return PositiveRational.Integer.Rational;
        }
        catch (e) {
            throw new ReferenceError(`PositiveRational: error loading Integer.Rational module: \n${e}`);
        }
    }
}
module.exports = PositiveRational;

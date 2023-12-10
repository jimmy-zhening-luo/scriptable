"use strict";
const f_Integer = importModule("integer/Integer");
class FiniteInteger extends f_Integer {
    constructor() {
        super(...arguments);
        this.bounds = new FiniteRational.Bounds.Finite();
    }
    static get Integer() {
        try {
            return f_Integer;
        }
        catch (e) {
            throw new ReferenceError(`FiniteInteger: error loading parent Integer module: \n${e}`);
        }
    }
}
module.exports = FiniteInteger;

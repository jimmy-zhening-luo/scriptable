"use strict";
const p_Integer = importModule("integer/Integer");
class PositiveInteger extends p_Integer {
    constructor() {
        super(...arguments);
        this.cardinality = new PositiveInteger.Cardinality.Positive();
    }
    static get Integer() {
        try {
            return p_Integer;
        }
        catch (e) {
            throw new ReferenceError(`PositiveInteger: error loading parent Integer module: \n${e}`);
        }
    }
}
module.exports = PositiveInteger;

"use strict";
const n_Integer = importModule("integer/Integer");
class NegativeInteger extends n_Integer {
    constructor() {
        super(...arguments);
        this.cardinality = new NegativeInteger.Cardinality.Negative();
    }
    static get Integer() {
        try {
            return n_Integer;
        }
        catch (e) {
            throw new ReferenceError(`NegativeInteger: error loading parent Integer module: \n${e}`);
        }
    }
}
module.exports = NegativeInteger;

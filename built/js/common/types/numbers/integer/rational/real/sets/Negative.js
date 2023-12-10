"use strict";
const n_Cardinality = importModule("cardinality/Cardinality");
class Negative extends n_Cardinality {
    static get Cardinality() {
        try {
            return n_Cardinality;
        }
        catch (e) {
            throw new ReferenceError("Negative: error importing Cardinality module");
        }
    }
    isCardinal(value) {
        try {
            return (super.isCardinal(value) && (value === 0 || value === -0 || value < 0));
        }
        catch (e) {
            throw new EvalError("Negative: error calling isCardinal");
        }
    }
}
module.exports = Negative;

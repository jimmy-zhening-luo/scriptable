"use strict";
const p_Cardinality = importModule("cardinality/Cardinality");
class Positive extends p_Cardinality {
    static get Cardinality() {
        try {
            return p_Cardinality;
        }
        catch (e) {
            throw new ReferenceError("Positive: error importing Cardinality module");
        }
    }
    isCardinal(value) {
        try {
            return (super.isCardinal(value) && (value === 0 || value === -0 || value > 0));
        }
        catch (e) {
            throw new EvalError("Positive: error calling isCardinal");
        }
    }
}
module.exports = Positive;

"use strict";
class Cardinality {
    isCardinal(value) {
        try {
            return !Number.isNaN(value);
        }
        catch (e) {
            throw new EvalError("Cardinality: error calling isCardinal");
        }
    }
}
module.exports = Cardinality;

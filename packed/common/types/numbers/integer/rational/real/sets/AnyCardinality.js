"use strict";
const a_Cardinality = importModule("cardinality/Cardinality");
class AnyCardinality extends a_Cardinality {
    static get Cardinality() {
        try {
            return a_Cardinality;
        }
        catch (e) {
            throw new ReferenceError("AnyCardinality: error importing Cardinality module");
        }
    }
}
module.exports = AnyCardinality;

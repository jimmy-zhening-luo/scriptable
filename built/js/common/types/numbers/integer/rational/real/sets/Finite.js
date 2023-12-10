"use strict";
const f_Bounds = importModule("bounds/Bounds");
class Finite extends f_Bounds {
    static get Bounds() {
        try {
            return f_Bounds;
        }
        catch (e) {
            throw new ReferenceError("Finite: error importing Bounds module");
        }
    }
    isBounded(value) {
        try {
            return (super.isBounded(value) && value !== Infinity && value !== -Infinity);
        }
        catch (e) {
            throw new EvalError("Finite: error calling isBounded");
        }
    }
}
module.exports = Finite;

"use strict";
class Bounds {
    isBounded(value) {
        try {
            return !Number.isNaN(value);
        }
        catch (e) {
            throw new EvalError("Bounds: error calling isBounded");
        }
    }
}
module.exports = Bounds;

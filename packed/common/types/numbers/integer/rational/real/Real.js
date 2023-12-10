"use strict";
class Real {
    static get Sets() {
        try {
            return importModule("sets/Sets");
        }
        catch (e) {
            throw new ReferenceError("Real: error importing Sets module");
        }
    }
    static get Bounds() {
        try {
            return Real.Sets.Bounds;
        }
        catch (e) {
            throw new ReferenceError("Real: error importing Bounds module");
        }
    }
    static get Cardinality() {
        try {
            return Real.Sets.Cardinality;
        }
        catch (e) {
            throw new ReferenceError("Real: error importing Cardinality module");
        }
    }
    get isValid() {
        try {
            return this._qualifies(this._raw);
        }
        catch (e) {
            throw new EvalError("Real: error calling isValid");
        }
    }
    get value() {
        try {
            return this.isValid
                ? this._raw
                : null;
        }
        catch (e) {
            throw new EvalError("Rational: error calling number");
        }
    }
    toNumber() {
        var _a;
        try {
            return (_a = this.value) !== null && _a !== void 0 ? _a : NaN;
        }
        catch (e) {
            throw new EvalError("Real: error calling toNumber");
        }
    }
    toString() {
        try {
            return this.isValid
                ? String(this.toNumber())
                : "";
        }
        catch (e) {
            throw new EvalError("Real: error calling toString");
        }
    }
}
module.exports = Real;

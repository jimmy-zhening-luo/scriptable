"use strict";
class UrlPart {
    constructor(part = "") {
        this._nominalType = "UrlPart";
        try {
            this.value = this.parse(part.toString());
            if (this.value === "")
                this.value = null;
        }
        catch (e) {
            throw new SyntaxError(`UrlPart: constructor: error creating UrlPart: \n${e}`);
        }
    }
    static get Repeaters() {
        try {
            return importModule("repeaters/Repeaters");
        }
        catch (e) {
            throw new ReferenceError(`UrlPart: error loading parent Repeaters module: \n${e}`);
        }
    }
    static get UrlValidators() {
        try {
            return UrlPart.Repeaters.UrlValidators;
        }
        catch (e) {
            throw new ReferenceError(`UrlPart: error loading parent UrlValidators module: \n${e}`);
        }
    }
    get isValid() {
        try {
            return this.value !== null;
        }
        catch (e) {
            throw new EvalError(`UrlPart: isValid: error checking if UrlPart is valid: \n${e}`);
        }
    }
    static [Symbol.hasInstance](instance) {
        try {
            return (instance !== null
                && instance !== undefined
                && typeof instance === "object"
                && "_nominalType" in instance
                && instance._nominalType === "UrlPart");
        }
        catch (e) {
            throw new EvalError(`UrlPart: error checking if object is UrlPart: \n${e}`);
        }
    }
    toString() {
        var _a;
        try {
            return (_a = this.value) !== null && _a !== void 0 ? _a : "";
        }
        catch (e) {
            throw new Error(`UrlPart: toString: error converting UrlPart to string: \n${e}`);
        }
    }
}
module.exports = UrlPart;

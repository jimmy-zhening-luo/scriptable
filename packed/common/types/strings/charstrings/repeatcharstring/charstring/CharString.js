"use strict";
class CharString {
    constructor(candidateCharString = "", ...charsetCtorParams) {
        try {
            this._raw = candidateCharString;
            this.charset = new CharString.CharSets.CharSet(...charsetCtorParams);
        }
        catch (e) {
            throw new Error(`CharString: constructor: Error creating CharString object: \n${e}`);
        }
    }
    static get CharSets() {
        try {
            return importModule("charsets/CharSets");
        }
        catch (e) {
            throw new ReferenceError(`CharString: CharSets: Error importing CharSets module: \n${e}`);
        }
    }
    get isValid() {
        try {
            return this._qualifies(this._raw);
        }
        catch (e) {
            throw new EvalError(`CharString: isValid: Error checking if CharString is valid: \n${e}`);
        }
    }
    get value() {
        try {
            return this.isValid
                ? this._raw
                : null;
        }
        catch (e) {
            throw new EvalError(`CharString: value: Error getting CharString value: \n${e}`);
        }
    }
    toString() {
        var _a;
        try {
            return (_a = this.value) !== null && _a !== void 0 ? _a : "";
        }
        catch (e) {
            throw new EvalError(`CharString: toString: Error converting CharString to string: \n${e}`);
        }
    }
}
module.exports = CharString;

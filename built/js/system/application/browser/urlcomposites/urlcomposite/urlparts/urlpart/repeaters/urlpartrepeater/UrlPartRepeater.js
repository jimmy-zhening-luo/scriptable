"use strict";
class UrlPartRepeater {
    constructor(repeater) {
        try {
            this.value
                = repeater === null || repeater === ""
                    ? null
                    : this.parse(repeater);
            if (this.value === "")
                this.value = null;
        }
        catch (e) {
            throw new Error(`UrlPartRepeater: constructor: error creating UrlPartRepeater: \n${e}`);
        }
    }
    static get UrlValidators() {
        try {
            return importModule("validators/UrlValidators");
        }
        catch (e) {
            throw new ReferenceError(`UrlPartRepeater: error loading parent UrlValidators module: \n${e}`);
        }
    }
    get isValid() {
        try {
            return this.value !== null;
        }
        catch (e) {
            throw new Error(`UrlPartRepeater: isValid: error checking if UrlPartRepeater is valid: \n${e}`);
        }
    }
    toString() {
        var _a;
        try {
            return (_a = this.value) !== null && _a !== void 0 ? _a : "";
        }
        catch (e) {
            throw new Error(`UrlPartRepeater: toString: error converting UrlPartRepeater to string: \n${e}`);
        }
    }
}
module.exports = UrlPartRepeater;

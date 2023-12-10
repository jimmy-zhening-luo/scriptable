"use strict";
class UrlComposite {
    static get UrlParts() {
        try {
            return importModule("urlparts/UrlParts");
        }
        catch (e) {
            throw new ReferenceError(`UrlComposite: error loading UrlParts module: \n${e}`);
        }
    }
    get isValid() {
        try {
            return this.composite !== "";
        }
        catch (e) {
            throw new Error(`UrlComposite: isValid: error checking validity of composite: \n${e}`);
        }
    }
    toString() {
        try {
            return this.composite;
        }
        catch (e) {
            throw new Error(`UrlComposite: toString: error converting composite to string: \n${e}`);
        }
    }
}
module.exports = UrlComposite;

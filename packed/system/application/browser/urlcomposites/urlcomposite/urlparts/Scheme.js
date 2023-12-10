"use strict";
const sc_UrlPart = importModule("urlpart/UrlPart");
class Scheme extends sc_UrlPart {
    constructor(scheme) {
        try {
            super(scheme);
        }
        catch (e) {
            throw new Error(`Scheme: constructor: error creating Scheme: \n${e}`);
        }
    }
    static get ValidScheme() {
        try {
            return Scheme.UrlValidators.Scheme;
        }
        catch (e) {
            throw new ReferenceError(`Scheme: error loading ValidScheme module: \n${e}`);
        }
    }
    static get UrlPart() {
        try {
            return sc_UrlPart;
        }
        catch (e) {
            throw new ReferenceError(`Scheme: error loading parent UrlPart module: \n${e}`);
        }
    }
    parse(scheme) {
        var _a;
        try {
            const validScheme = new Scheme.ValidScheme(scheme)
                .toString();
            const charSetAlpha = Scheme.ValidScheme.UrlCharSet.alpha;
            return validScheme === ""
                ? "https"
                : charSetAlpha.includes((_a = [...validScheme].shift()) !== null && _a !== void 0 ? _a : "")
                    ? validScheme
                    : "https";
        }
        catch (e) {
            throw new Error(`Scheme: parse: error parsing Scheme: \n${e}`);
        }
    }
}
module.exports = Scheme;

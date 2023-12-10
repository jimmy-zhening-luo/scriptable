"use strict";
class UrlParts {
    static get UrlPart() {
        try {
            return UrlParts.Scheme.UrlPart;
        }
        catch (e) {
            throw new ReferenceError(`UrlParts: error loading parent UrlPart module: \n${e}`);
        }
    }
    static get Scheme() {
        try {
            return importModule("Scheme");
        }
        catch (e) {
            throw new ReferenceError(`UrlParts: error loading parent Scheme module: \n${e}`);
        }
    }
    static get Host() {
        try {
            return importModule("Host");
        }
        catch (e) {
            throw new ReferenceError(`UrlParts: error loading parent Host module: \n${e}`);
        }
    }
    static get Port() {
        try {
            return importModule("Port");
        }
        catch (e) {
            throw new ReferenceError(`UrlParts: error loading parent Port module: \n${e}`);
        }
    }
    static get Path() {
        try {
            return importModule("Path");
        }
        catch (e) {
            throw new ReferenceError(`UrlParts: error loading parent Path module: \n${e}`);
        }
    }
    static get Query() {
        try {
            return importModule("Query");
        }
        catch (e) {
            throw new ReferenceError(`UrlParts: error loading parent Query module: \n${e}`);
        }
    }
    static get Fragment() {
        try {
            return importModule("Fragment");
        }
        catch (e) {
            throw new ReferenceError(`UrlParts: error loading parent Fragment module: \n${e}`);
        }
    }
}
module.exports = UrlParts;

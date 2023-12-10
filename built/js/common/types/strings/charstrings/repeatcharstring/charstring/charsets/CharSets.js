"use strict";
class CharSets {
    static get UrlCharSet() {
        try {
            return importModule("UrlCharSet");
        }
        catch (e) {
            throw new ReferenceError(`CharSets: UrlCharSet: Error importing UrlCharSet module: \n${e}`);
        }
    }
    static get CharSet() {
        try {
            return CharSets.UrlCharSet.CharSet;
        }
        catch (e) {
            throw new ReferenceError(`CharSets: CharSet: Error importing CharSet module: \n${e}`);
        }
    }
}
module.exports = CharSets;

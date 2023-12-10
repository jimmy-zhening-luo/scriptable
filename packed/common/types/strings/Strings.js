"use strict";
class Strings {
    static get StringSplitter() {
        try {
            return importModule("StringSplitter");
        }
        catch (e) {
            throw new ReferenceError(`Strings: StringSplitter: Error importing StringSplitter module: \n${e}`);
        }
    }
    static get ValidString() {
        try {
            return importModule("ValidString");
        }
        catch (e) {
            throw new ReferenceError(`Strings: ValidString: Error importing ValidString module: \n${e}`);
        }
    }
    static get CharSets() {
        try {
            return Strings.ValidString.CharSets;
        }
        catch (e) {
            throw new ReferenceError(`Strings: CharSets: Error importing CharSets module: \n${e}`);
        }
    }
    static get CharSet() {
        try {
            return Strings.CharSets.CharSet;
        }
        catch (e) {
            throw new ReferenceError(`Strings: CharSet: Error importing CharSet module: \n${e}`);
        }
    }
    static get UrlCharSet() {
        try {
            return Strings.CharSets.UrlCharSet;
        }
        catch (e) {
            throw new ReferenceError(`Strings: UrlCharSet: Error importing UrlCharSet module: \n${e}`);
        }
    }
}
module.exports = Strings;

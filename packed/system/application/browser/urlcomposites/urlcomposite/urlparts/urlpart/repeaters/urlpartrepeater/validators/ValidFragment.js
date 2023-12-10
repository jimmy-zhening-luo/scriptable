"use strict";
const fr_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidFragment extends fr_ValidUrlPart {
    constructor(fragment) {
        try {
            super(fragment, 1, Infinity, {
                trimLeading: [...ValidFragment.UrlCharSet.hash],
            }, ValidFragment.UrlCharSet.pchar, ValidFragment.UrlCharSet.slash, ValidFragment.UrlCharSet.question);
        }
        catch (e) {
            throw new Error(`ValidFragment: constructor: error creating ValidFragment: \n${e}`);
        }
    }
    static get ValidUrlPart() {
        try {
            return fr_ValidUrlPart;
        }
        catch (e) {
            throw new ReferenceError(`ValidFragment: error loading parent ValidUrlPart module: \n${e}`);
        }
    }
}
module.exports = ValidFragment;

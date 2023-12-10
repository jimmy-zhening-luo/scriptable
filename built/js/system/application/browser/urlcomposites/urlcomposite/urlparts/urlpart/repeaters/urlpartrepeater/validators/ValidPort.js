"use strict";
const po_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidPort extends po_ValidUrlPart {
    constructor(port) {
        try {
            super(port, 1, Infinity, {
                trimLeading: [...po_ValidUrlPart.UrlCharSet.colon],
            }, po_ValidUrlPart.UrlCharSet.numbers);
        }
        catch (e) {
            throw new Error(`ValidPort: constructor: error creating ValidPort: \n${e}`);
        }
    }
    static get ValidUrlPart() {
        try {
            return po_ValidUrlPart;
        }
        catch (e) {
            throw new ReferenceError(`ValidPort: error loading parent ValidUrlPart module: \n${e}`);
        }
    }
}
module.exports = ValidPort;

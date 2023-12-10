"use strict";
const r_ValidUrlPart = importModule("ValidUrlPart");
class ValidUrlRepeater extends r_ValidUrlPart {
    constructor(part, minLength = 1, maxLength = Infinity, ...allowedChars) {
        try {
            super(part, minLength, maxLength, {}, ...allowedChars);
        }
        catch (e) {
            throw new Error(`ValidUrlRepeater: constructor: error creating ValidUrlRepeater: \n${e}`);
        }
    }
    static get ValidUrlPart() {
        try {
            return r_ValidUrlPart;
        }
        catch (e) {
            throw new ReferenceError(`ValidUrlRepeater: error loading parent ValidUrlPart module: \n${e}`);
        }
    }
}
module.exports = ValidUrlRepeater;

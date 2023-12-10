"use strict";
const up_ValidString = importModule("./common/types/strings/ValidString");
class ValidUrlPart extends up_ValidString {
    constructor(part, minLength = 1, maxLength = Infinity, { toLower = false, trimLeading = [], trimTrailing = [], }, ...allowedChars) {
        try {
            super(part, {
                min: minLength,
                max: maxLength,
                allowedChars: allowedChars,
            }, {
                trim: true,
                toLower: toLower,
                trimLeading: trimLeading,
                trimTrailing: trimTrailing,
            });
        }
        catch (e) {
            throw new EvalError(`ValidUrlPart: constructor: error creating ValidUrlPart: \n {${e}`);
        }
    }
    static get ValidString() {
        return up_ValidString;
    }
}
module.exports = ValidUrlPart;

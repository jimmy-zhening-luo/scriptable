"use strict";
const fpr_ValidString = importModule("./common/types/strings/ValidString");
class ValidFilepathRepeater extends fpr_ValidString {
    constructor(pathSegment = "") {
        try {
            super(pathSegment, {
                min: 1,
                max: 255,
                negate: true,
                allowedChars: [
                    ...ValidFilepathRepeater.CharSet.colon,
                    ...ValidFilepathRepeater.CharSet.slash,
                ],
            });
        }
        catch (e) {
            throw new SyntaxError(`ValidFilepathRepeater: constructor: Caught unhandled exception instantiating parent class ValidFilepathRepeater: \n${e}`);
        }
    }
    static get ValidString() {
        try {
            return fpr_ValidString;
        }
        catch (e) {
            throw new ReferenceError(`ValidFilepathRepeater: ValidString: Failed to import ValidString module: \n${e}`);
        }
    }
}
module.exports = ValidFilepathRepeater;

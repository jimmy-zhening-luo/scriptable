"use strict";
const pa_ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");
class ValidPathRepeater extends pa_ValidUrlRepeater {
    constructor(pathRepeater) {
        try {
            super(pathRepeater, 0, Infinity, pa_ValidUrlRepeater.UrlCharSet.pchar);
        }
        catch (e) {
            throw new Error(`ValidPathRepeater: constructor: error creating ValidPathRepeater: \n${e}`);
        }
    }
    static get ValidUrlRepeater() {
        try {
            return pa_ValidUrlRepeater;
        }
        catch (e) {
            throw new ReferenceError(`ValidPathRepeater: error loading parent ValidUrlRepeater module: \n${e}`);
        }
    }
}
module.exports = ValidPathRepeater;

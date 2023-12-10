"use strict";
const qu_ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");
class ValidQueryRepeater extends qu_ValidUrlRepeater {
    constructor(queryRepeater) {
        try {
            super(queryRepeater, 1, Infinity, qu_ValidUrlRepeater.UrlCharSet.pchar, qu_ValidUrlRepeater.UrlCharSet.slash, qu_ValidUrlRepeater.UrlCharSet.question);
        }
        catch (e) {
            throw new Error(`ValidQueryRepeater: constructor: error creating ValidQueryRepeater: \n${e}`);
        }
    }
    static get ValidUrlRepeater() {
        try {
            return qu_ValidUrlRepeater;
        }
        catch (e) {
            throw new ReferenceError(`ValidQueryRepeater: error loading parent ValidUrlRepeater module: \n${e}`);
        }
    }
}
module.exports = ValidQueryRepeater;

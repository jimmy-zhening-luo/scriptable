"use strict";
const hrn_ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");
class ValidHostRegNameRepeater extends hrn_ValidUrlRepeater {
    constructor(hostRegNameRepeater) {
        try {
            super(hostRegNameRepeater, 1, Infinity, hrn_ValidUrlRepeater.UrlCharSet.unreserved, hrn_ValidUrlRepeater.UrlCharSet.percentEncoded, hrn_ValidUrlRepeater.UrlCharSet.subDelims);
        }
        catch (e) {
            throw new Error(`ValidHostRegNameRepeater: constructor: error creating ValidHostRegNameRepeater: \n${e}`);
        }
    }
    static get ValidUrlRepeater() {
        try {
            return hrn_ValidUrlRepeater;
        }
        catch (e) {
            throw new ReferenceError(`ValidHostRegNameRepeater: error loading parent ValidUrlRepeater module: \n${e}`);
        }
    }
}
module.exports = ValidHostRegNameRepeater;

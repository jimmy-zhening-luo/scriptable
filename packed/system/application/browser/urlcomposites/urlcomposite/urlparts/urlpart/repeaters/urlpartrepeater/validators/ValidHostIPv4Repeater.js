"use strict";
const hipf_ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");
class ValidHostIPv4Repeater extends hipf_ValidUrlRepeater {
    constructor(hostIPv4Repeater) {
        try {
            super(hostIPv4Repeater, 1, 3, hipf_ValidUrlRepeater.UrlCharSet.numbers);
        }
        catch (e) {
            throw new Error(`ValidHostIPv4Repeater: constructor: error creating ValidHostIPv4Repeater: \n${e}`);
        }
    }
    static get ValidUrlRepeater() {
        try {
            return hipf_ValidUrlRepeater;
        }
        catch (e) {
            throw new ReferenceError(`ValidHostIPv4Repeater: error loading parent ValidUrlRepeater module: \n${e}`);
        }
    }
}
module.exports = ValidHostIPv4Repeater;

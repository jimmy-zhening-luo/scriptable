"use strict";
const hips_ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");
class ValidHostIPv6Repeater extends hips_ValidUrlRepeater {
    constructor(hostIPv6Repeater) {
        try {
            super(hostIPv6Repeater, 0, 4, hips_ValidUrlRepeater.UrlCharSet.hex);
        }
        catch (e) {
            throw new Error(`ValidHostIPv6Repeater: constructor: error creating ValidHostIPv6Repeater: \n${e}`);
        }
    }
}
module.exports = ValidHostIPv6Repeater;

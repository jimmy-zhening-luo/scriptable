const hips_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidHostIPv6Repeater extends hips_ValidUrlPart {
    constructor(hostIPv6Repeater) {
        super(hostIPv6Repeater, {
            trim: false
        }, {
            maxLength: 4
        }, hips_ValidUrlPart._UrlChar.hex);
    }
}
module.exports = ValidHostIPv6Repeater;
//# sourceMappingURL=ValidHostIPv6Repeater.js.map
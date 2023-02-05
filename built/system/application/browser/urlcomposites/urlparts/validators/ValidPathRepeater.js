const pa_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidPathRepeater extends pa_ValidUrlPart {
    constructor(pathRepeater) {
        super(pathRepeater, {
            trim: false
        }, {}, pa_ValidUrlPart._UrlChar.pchar);
    }
}
module.exports = ValidPathRepeater;
//# sourceMappingURL=ValidPathRepeater.js.map
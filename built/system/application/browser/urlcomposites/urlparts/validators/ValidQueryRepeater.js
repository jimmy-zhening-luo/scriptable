const qu_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidQueryRepeater extends qu_ValidUrlPart {
    constructor(queryRepeater) {
        super(queryRepeater, {
            trim: false
        }, {}, qu_ValidUrlPart._UrlChar.pchar, qu_ValidUrlPart._UrlChar.slash, qu_ValidUrlPart._UrlChar.question);
    }
}
module.exports = ValidQueryRepeater;
//# sourceMappingURL=ValidQueryRepeater.js.map
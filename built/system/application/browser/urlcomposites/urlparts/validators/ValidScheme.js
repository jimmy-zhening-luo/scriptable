const sc_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidScheme extends sc_ValidUrlPart {
    constructor(scheme) {
        super(scheme, {
            toLower: true,
            trimTrailing: [
                ...ValidScheme._UrlChar.slash,
                ...ValidScheme._UrlChar.colon
            ]
        }, {}, ValidScheme._UrlChar.alphaNumericLower, ValidScheme._UrlChar.plus, ValidScheme._UrlChar.hyphen, ValidScheme._UrlChar.dot);
    }
}
module.exports = ValidScheme;
//# sourceMappingURL=ValidScheme.js.map
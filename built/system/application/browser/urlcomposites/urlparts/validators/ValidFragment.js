const fr_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidFragment extends fr_ValidUrlPart {
    constructor(fragment) {
        super(fragment, {
            trimLeading: [
                ...ValidFragment._UrlChar.hash
            ]
        }, {}, ValidFragment._UrlChar.pchar, ValidFragment._UrlChar.slash, ValidFragment._UrlChar.question);
    }
}
module.exports = ValidFragment;
//# sourceMappingURL=ValidFragment.js.map
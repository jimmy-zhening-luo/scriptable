const po_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidPort extends po_ValidUrlPart {
    constructor(port) {
        super(port, {
            trimLeading: [
                ...UrlChar.colon
            ]
        }, {}, UrlChar.numbers);
    }
}
module.exports = ValidPort;
//# sourceMappingURL=ValidPort.js.map
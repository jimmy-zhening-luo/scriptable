const po_ValidUrlPart = importModule("validurlpart/ValidUrlPart");
class ValidPort extends po_ValidUrlPart {
    constructor(port) {
        super(port, {
            trimLeading: [
                ...po_ValidUrlPart._UrlChar.colon
            ]
        }, {}, po_ValidUrlPart._UrlChar.numbers);
    }
}
module.exports = ValidPort;
//# sourceMappingURL=ValidPort.js.map
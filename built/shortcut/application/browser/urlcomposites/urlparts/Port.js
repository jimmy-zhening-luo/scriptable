const po_UrlPart = importModule("urlpart/UrlPart");
class Port extends po_UrlPart {
    constructor(port) {
        super(typeof port === "number" ?
            Number.isInteger(port) ?
                String(Math.trunc(port))
                : String()
            : port);
    }
    parse(port) {
        const parsedString = new Port._ValidPort(port)
            .toString();
        const parsedInt = Number.isInteger(Number.parseInt(parsedString)) ?
            Math.round(Number.parseInt(parsedString))
            : 0;
        return (parsedInt >= 1
            && parsedInt <= 65535) ?
            String(Math.round(parsedInt)).trim()
            : String();
    }
    get number() {
        return (this.string === String()) ?
            0
            : Math.abs(Math.round(Number.parseInt(this.string)));
    }
    toNumber(coerceEmptyPortToNull = false) {
        const zeroValue = coerceEmptyPortToNull ?
            null
            : 0;
        return this.number === 0 ?
            zeroValue
            : this.number;
    }
}
(function (Port) {
    Port._ValidPort = importModule("validators/ValidPort");
})(Port || (Port = {}));
module.exports = Port;
//# sourceMappingURL=Port.js.map
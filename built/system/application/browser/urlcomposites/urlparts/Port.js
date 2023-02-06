const po_UrlPart = importModule("urlpart/UrlPart");
class Port extends po_UrlPart {
    constructor(port) {
        super(typeof port === "number" ?
            Number.isInteger(port) ?
                String(Math.trunc(port))
                : null
            : port);
    }
    parse(port) {
        const parsedString = new Port._ValidPort(port)
            .toString();
        const parsedInt = Number.isInteger(Number.parseInt(parsedString)) ?
            Math.round(Number.parseInt(parsedString))
            : NaN;
        return (parsedInt >= 1
            && parsedInt <= 65535) ?
            String(Math.round(parsedInt)).trim()
            : null;
    }
    toNumber(coerceEmptyPortToZero = false) {
        return this.isValid ?
            Math.abs(Math.round(Number.parseInt(this.toString())))
            : coerceEmptyPortToZero ?
                0
                : NaN;
    }
}
(function (Port) {
    Port._ValidPort = importModule("validators/ValidPort");
})(Port || (Port = {}));
module.exports = Port;
//# sourceMappingURL=Port.js.map
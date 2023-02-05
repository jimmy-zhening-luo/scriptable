const sc_UrlPart = importModule("urlpart/UrlPart");
class Scheme extends sc_UrlPart {
    constructor(scheme) {
        super(scheme);
    }
    parse(scheme) {
        var _a;
        const validScheme = new Scheme._ValidScheme(scheme);
        const firstChar = (_a = [...validScheme.toString()].shift()) !== null && _a !== void 0 ? _a : "";
        const alpha = Scheme._ValidScheme._UrlChar.alpha;
        return (validScheme.isValid && alpha.includes(firstChar)) ?
            validScheme.toString()
            : "https";
    }
}
(function (Scheme) {
    Scheme._ValidScheme = importModule("validators/ValidScheme");
})(Scheme || (Scheme = {}));
module.exports = Scheme;
//# sourceMappingURL=Scheme.js.map
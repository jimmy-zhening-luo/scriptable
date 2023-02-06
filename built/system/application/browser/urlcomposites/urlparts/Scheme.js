const sc_UrlPart = importModule("urlpart/UrlPart");
class Scheme extends sc_UrlPart {
    parse(scheme) {
        var _a;
        const validScheme = new Scheme._ValidScheme(scheme).toString();
        const charSetAlpha = Scheme._ValidScheme._UrlChar.alpha;
        const defaultScheme = "https";
        return validScheme === "" ?
            validScheme
            : charSetAlpha.includes((_a = [...validScheme].shift()) !== null && _a !== void 0 ? _a : "") ?
                validScheme
                : defaultScheme;
    }
}
(function (Scheme) {
    Scheme._ValidScheme = importModule("validators/ValidScheme");
})(Scheme || (Scheme = {}));
module.exports = Scheme;
//# sourceMappingURL=Scheme.js.map
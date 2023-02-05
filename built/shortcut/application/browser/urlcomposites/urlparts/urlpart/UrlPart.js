class UrlPart {
    constructor(part = "") {
        this.ClassDecorator_UrlPart = "UrlPart";
        this.value = this.parse(part.toString());
    }
    get isValid() {
        return this.value !== null;
    }
    get string() {
        var _a;
        return (_a = this.value) !== null && _a !== void 0 ? _a : "";
    }
    toString() {
        return this.string;
    }
}
module.exports = UrlPart;
//# sourceMappingURL=UrlPart.js.map
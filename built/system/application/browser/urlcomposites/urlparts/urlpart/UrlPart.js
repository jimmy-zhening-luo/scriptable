class UrlPart {
    constructor(part) {
        this.ClassDecorator_UrlPart = "UrlPart";
        this.value = (part === null
            || part === undefined
            || part.toString() === "") ?
            null
            : this.parse(part.toString());
        if (this.value === "")
            this.value = null;
    }
    get isValid() {
        return this.value !== null;
    }
    toString() {
        var _a;
        return (_a = this.value) !== null && _a !== void 0 ? _a : "";
    }
}
module.exports = UrlPart;
//# sourceMappingURL=UrlPart.js.map
class UrlPartRepeater {
    constructor(repeater) {
        this.value = this.parse(repeater);
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
module.exports = UrlPartRepeater;
//# sourceMappingURL=UrlPartRepeater.js.map
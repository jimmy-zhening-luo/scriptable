class UrlPartRepeater {
    constructor(repeater) {
        this.value = (repeater === null
            || repeater === undefined
            || repeater === "") ?
            null
            : this.parse(repeater);
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
module.exports = UrlPartRepeater;
//# sourceMappingURL=UrlPartRepeater.js.map
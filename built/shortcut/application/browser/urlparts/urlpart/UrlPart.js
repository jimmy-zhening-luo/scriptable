class UrlPart {
    constructor(part = String()) {
        this.part = part instanceof UrlPart ?
            this.parse(part.string)
            : this.parse(part);
    }
    get string() {
        return this.part;
    }
    toString() {
        return this.string;
    }
}
//# sourceMappingURL=UrlPart.js.map
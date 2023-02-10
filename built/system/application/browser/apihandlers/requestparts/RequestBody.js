class RequestBody {
    constructor(body) {
        this._body = body !== null && body !== void 0 ? body : "";
    }
    toObject() {
        if (typeof this._body === "string")
            return this.toStringObject();
        else
            return this._body;
    }
    toStringObject() {
        if (typeof this._body === "string") {
            try {
                return JSON.parse(this._body);
            }
            catch (e) {
                return {};
            }
        }
        else
            return JSON.parse(JSON.stringify(this._body));
    }
    toString() {
        if (typeof this._body === "string")
            return this._body;
        else
            return JSON.stringify(this._body);
    }
}
module.exports = RequestBody;
//# sourceMappingURL=RequestBody.js.map
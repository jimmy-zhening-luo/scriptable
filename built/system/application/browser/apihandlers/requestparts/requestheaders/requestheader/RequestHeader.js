class RequestHeader {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    setKeyValue(key, value) {
        this.key = key;
        this.value = value;
        return this;
    }
    get stringValue() {
        return this.value.toString();
    }
    get keyValueTuple() {
        return [
            this.key,
            this.value
        ];
    }
    get keyValueObject() {
        return {
            [this.key]: this.value
        };
    }
    get keyValueStringObject() {
        return {
            [this.key]: this.stringValue
        };
    }
    get keyValue() {
        return this.keyValueTuple.join(": ");
    }
    toTuple() {
        return this.keyValueTuple;
    }
    toObject() {
        return this.keyValueObject;
    }
    toStringObject() {
        return this.keyValueStringObject;
    }
    toString() {
        return this.keyValue;
    }
}
module.exports = RequestHeader;
//# sourceMappingURL=RequestHeader.js.map
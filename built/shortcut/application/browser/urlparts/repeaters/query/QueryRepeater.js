class QueryRepeater {
    constructor(keyHolder, value) {
        // parsing TBD
        if (keyHolder === undefined)
            this.key = this.value = String();
        else if (typeof keyHolder === "string") {
            if (value === undefined) {
                keyHolder = keyHolder.trim();
                while (keyHolder.startsWith("?"))
                    keyHolder = keyHolder.slice(1);
                while (keyHolder.startsWith("&"))
                    keyHolder = keyHolder.slice(1);
                while (keyHolder.endsWith("&"))
                    keyHolder = keyHolder.slice(0, -1);
                const queryStringSegment = keyHolder;
                const splitQueryStringSegment = queryStringSegment.split("=");
                if (splitQueryStringSegment.length < 2) {
                    this.key = this.value = String();
                }
                else {
                    this.key = splitQueryStringSegment.shift();
                    this.value = splitQueryStringSegment.join("=");
                }
            }
            else {
                this.key = keyHolder.trim();
                this.value = value.trim();
            }
        }
        else if (Array.isArray(keyHolder)) {
            if (keyHolder.length < 2)
                this.key = this.value = String();
            else {
                this.key = keyHolder.shift();
                this.value = keyHolder.shift();
            }
        }
        else {
            this.key = keyHolder.key;
            this.value = keyHolder.value;
        }
    }
}
//# sourceMappingURL=QueryRepeater.js.map
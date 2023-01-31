class NGram extends Gram {
    constructor(text, n = 1) {
        n = Number.isNaN(n) ?
            1
            : Number.isFinite(n) ?
                n >= 1 ?
                    Math.round(n)
                    : 1
                : n !== -Infinity ?
                    Infinity
                    : 1;
        super(n === Infinity ?
            text
            : text.length >= n ?
                text.slice(0, n)
                : String());
        this.n = n;
        this.remainder = text
            .slice(this.word.length);
    }
    get isToken() {
        return this.word.length > 0;
    }
    get valid() {
        return this.isToken;
    }
    get deterministic() {
        return Number.isFinite(this.n);
    }
    get hasRemainder() {
        return this.remainder.length > 0;
    }
}
//# sourceMappingURL=NGram.js.map
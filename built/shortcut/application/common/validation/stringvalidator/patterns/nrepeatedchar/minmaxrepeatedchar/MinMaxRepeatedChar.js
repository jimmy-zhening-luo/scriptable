class MinMaxRepeatedChar extends RepeatedChar {
    constructor(minReps, maxReps, ...charsets) {
        super(...charsets);
        if (minReps < 0
            || maxReps < 0
            || Number.isNaN(minReps)
            || Number.isNaN(maxReps))
            minReps = maxReps = 0;
        if (minReps > maxReps) {
            const tmp = minReps;
            minReps = maxReps;
            maxReps = tmp;
        }
        if (!Number.isFinite(minReps))
            this.minReps = this.maxReps = 0;
        else {
            this.minReps = minReps;
            this.maxReps = maxReps;
        }
    }
    match(token) {
        return token.length >= this.minReps
            && token.length <= this.maxReps
            && [...token].every((char) => (this.charset.includes(char)));
    }
}
//# sourceMappingURL=MinMaxRepeatedChar.js.map
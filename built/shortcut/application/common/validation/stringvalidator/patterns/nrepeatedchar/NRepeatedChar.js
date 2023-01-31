class NRepeatedChar extends MinMaxRepeatedChar {
    constructor(reps, ...charsets) {
        super(reps, reps, ...charsets);
    }
    get reps() {
        return this.minReps;
    }
}
//# sourceMappingURL=NRepeatedChar.js.map
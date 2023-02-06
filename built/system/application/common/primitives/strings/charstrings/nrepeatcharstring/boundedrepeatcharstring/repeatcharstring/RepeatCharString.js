const _CharString = importModule("charstring/CharString");
class RepeatCharString extends _CharString {
    qualifies(candidateCharString) {
        return candidateCharString !== ""
            && this.parseCharStringToCharArray(candidateCharString)
                .every(char => this
                .ofChar
                .includes(char));
    }
    parseCharStringToCharArray(candidateCharString) {
        return [...candidateCharString];
    }
}
module.exports = RepeatCharString;
//# sourceMappingURL=RepeatCharString.js.map
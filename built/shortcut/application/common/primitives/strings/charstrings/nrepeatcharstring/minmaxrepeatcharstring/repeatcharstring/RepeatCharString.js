const _CharString = importModule("charstring/CharString");
class RepeatCharString extends CharString {
    qualifies(candidateCharString) {
        return this
            .parseCharStringToCharArray(candidateCharString)
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
"use strict";
const rp_CharString = importModule("charstring/CharString");
class RepeatCharString extends rp_CharString {
    static get CharString() {
        try {
            return rp_CharString;
        }
        catch (e) {
            throw new ReferenceError(`RepeatCharString: CharString: Error importing CharString module: \n${e}`);
        }
    }
    _qualifies(candidateCharString) {
        try {
            return [...candidateCharString].every(char => this.charset.allows(char));
        }
        catch (e) {
            throw new EvalError(`RepeatCharString: qualifies: Error checking if CharString qualifies: \n${e}`);
        }
    }
}
module.exports = RepeatCharString;

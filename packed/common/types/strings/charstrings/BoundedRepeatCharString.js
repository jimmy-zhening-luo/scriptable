"use strict";
const _RepeatCharString = importModule("repeatcharstring/RepeatCharString");
class BoundedRepeatCharString extends _RepeatCharString {
    constructor(min = 0, max = Infinity, ...repeatCharStringCtorParams) {
        try {
            super(...repeatCharStringCtorParams);
            for (const bound of [
                min,
                max,
            ]) {
                if (!new BoundedRepeatCharString.PositiveInteger(bound).isValid)
                    throw SyntaxError(`the value ${bound} of min ${min} or max ${max} is not a valid positive integer`);
            }
            let minIntToNum = new BoundedRepeatCharString.PositiveInteger(min)
                .toNumber();
            let maxIntToNum = new BoundedRepeatCharString.PositiveInteger(max)
                .toNumber();
            if (minIntToNum > maxIntToNum) {
                const tmp = minIntToNum;
                minIntToNum = maxIntToNum;
                maxIntToNum = tmp;
            }
            if (minIntToNum === Infinity)
                minIntToNum = maxIntToNum = 0;
            this.min = minIntToNum;
            this.max = maxIntToNum;
        }
        catch (e) {
            throw new EvalError(`BoundedRepeatCharString: constructor: Error creating BoundedRepeatCharString object: \n${e}`);
        }
    }
    static get PositiveInteger() {
        try {
            return importModule("./common/types/numbers/PositiveInteger");
        }
        catch (e) {
            throw new ReferenceError(`BoundedRepeatCharString: PositiveInteger: Error importing PositiveInteger module: \n${e}`);
        }
    }
    static get RepeatCharString() {
        try {
            return _RepeatCharString;
        }
        catch (e) {
            throw new ReferenceError(`BoundedRepeatCharString: RepeatCharString: Error importing RepeatCharString module: \n${e}`);
        }
    }
    _qualifies(candidateCharString) {
        try {
            return (super._qualifies(candidateCharString)
                && candidateCharString.length >= this.min
                && candidateCharString.length <= this.max);
        }
        catch (e) {
            throw new EvalError(`BoundedRepeatCharString: _qualifies: Error calling _qualifies: \n${e}`);
        }
    }
}
module.exports = BoundedRepeatCharString;

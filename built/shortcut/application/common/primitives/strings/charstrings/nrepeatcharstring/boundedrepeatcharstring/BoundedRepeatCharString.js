const _RepeatCharString = importModule("repeatcharstring/RepeatCharString");
class BoundedRepeatCharString extends _RepeatCharString {
    constructor(min, max, charstring, ...ofCharInputs) {
        let minInt = new BoundedRepeatCharString.positiveInt(min).toNumber();
        let maxInt = new BoundedRepeatCharString.positiveInt(max).toNumber();
        if (Number.isNaN(minInt)
            || Number.isNaN(maxInt))
            minInt = maxInt = 0;
        else {
            if (minInt > maxInt) {
                const prevMinInt = minInt;
                minInt = maxInt;
                maxInt = prevMinInt;
            }
            if (minInt === Infinity)
                minInt = maxInt = 0;
        }
        super(charstring.length >= minInt && charstring.length <= maxInt ?
            charstring
            : "", ...ofCharInputs);
        this.min = minInt;
        this.max = maxInt;
    }
}
(function (BoundedRepeatCharString) {
    BoundedRepeatCharString.positiveInt = importModule("./shortcut/application/common/primitives/numbers/PositiveInteger");
})(BoundedRepeatCharString || (BoundedRepeatCharString = {}));
module.exports = BoundedRepeatCharString;
//# sourceMappingURL=BoundedRepeatCharString.js.map
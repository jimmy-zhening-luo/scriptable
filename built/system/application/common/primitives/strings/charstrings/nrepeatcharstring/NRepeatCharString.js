const _BoundedRepeatCharString = importModule("boundedrepeatcharstring/BoundedRepeatCharString");
class NRepeatCharString extends _BoundedRepeatCharString {
    constructor(n, charstring, ...ofCharInputs) {
        super(n, n, charstring, ...ofCharInputs);
    }
    get n() {
        return this.max;
    }
}
module.exports = NRepeatCharString;
//# sourceMappingURL=NRepeatCharString.js.map
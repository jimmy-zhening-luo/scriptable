"use strict";
const _Rational = importModule("rational/Rational");
class Integer extends _Rational {
    static get Rational() {
        try {
            return _Rational;
        }
        catch (e) {
            throw new ReferenceError(`Integer: error loading parent Rational module: \n${e}`);
        }
    }
    _qualifies(rawNumber) {
        try {
            return (super._qualifies(rawNumber) && new Integer.Rational(rawNumber).isInteger);
        }
        catch (e) {
            throw new Error(`Integer.qualifies: \n${e}`);
        }
    }
}
module.exports = Integer;

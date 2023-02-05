const _Rational = importModule("rational/Rational");
class Integer extends _Rational {
    qualifies(value) {
        return super.qualifies(value)
            && Number.isInteger(value);
    }
}
module.exports = Integer;
//# sourceMappingURL=Integer.js.map
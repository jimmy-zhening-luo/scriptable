const _Real = importModule("real/Real");
class Rational extends _Real {
    constructor(value, cardinality, bounds) {
        super(cardinality, bounds);
        value = value instanceof Rational ?
            value.number
            : value;
        this.value = this.qualifies(value) ?
            value === -0 ?
                0
                : value
            : null;
    }
    qualifies(value) {
        return this.bounds.isBounded(value)
            && this.cardinality.isCardinal(value);
    }
    get isNumber() {
        return !(this.value === null);
    }
    get isFinite() {
        return Number.isFinite(this.number);
    }
    get isInfinite() {
        return this.isPositiveInfinite
            || this.isNegativeInfinite;
    }
    get isPositiveInfinite() {
        return this.number === Infinity;
    }
    get isNegativeInfinite() {
        return this.number === -Infinity;
    }
    get isZero() {
        return this.number === 0;
    }
    get isStrictlyPositive() {
        return this.number > 0;
    }
    get isStrictlyNegative() {
        return this.number < 0;
    }
    get isPositive() {
        return this.isZero
            || this.isStrictlyPositive;
    }
    get isNegative() {
        return this.isZero
            || this.isStrictlyNegative;
    }
    get isInteger() {
        return Number.isInteger(this.number);
    }
    get string() {
        return this.isNumber ?
            String()
            : String(this.value);
    }
    get number() {
        return this.isNumber ?
            this.value
            : NaN;
    }
}
module.exports = Rational;
//# sourceMappingURL=Rational.js.map
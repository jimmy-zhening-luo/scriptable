"use strict";
const r_Real = importModule("real/Real");
class Rational extends r_Real {
    constructor(number) {
        super();
        this.bounds = new Rational.Bounds.Infinite();
        this.cardinality = new Rational.Cardinality.AnyCardinality();
        try {
            this._raw
                = typeof number === "string"
                    ? number.trim()
                        .toLowerCase() === "infinity"
                        ? Infinity
                        : number.trim()
                            .toLowerCase() === "-infinity"
                            ? -Infinity
                            : number.trim()
                                .toLowerCase() === "nan"
                                ? NaN
                                : number.includes(".")
                                    ? Number.parseFloat(number)
                                    : Number.parseInt(number)
                    : typeof number === "number"
                        ? number
                        : number.toNumber();
        }
        catch (e) {
            throw new SyntaxError("Rational: error constructing Rational");
        }
    }
    static get Real() {
        try {
            return r_Real;
        }
        catch (e) {
            throw new ReferenceError("Rational: error importing module Real");
        }
    }
    get isNaN() {
        try {
            return Number.isNaN(this.toNumber());
        }
        catch (e) {
            throw new EvalError("Rational: error calling isNaN");
        }
    }
    get isZero() {
        try {
            return this.toNumber() === 0 || this.toNumber() === -0;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isZero");
        }
    }
    get isNonZero() {
        try {
            return !this.isNaN && !this.isZero;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isNonZero");
        }
    }
    get isFinite() {
        try {
            return Number.isFinite(this.toNumber());
        }
        catch (e) {
            throw new EvalError("Rational: error calling isFinite");
        }
    }
    get isInfinity() {
        try {
            return this.isPositiveInfinity || this.isNegativeInfinity;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isInfinite");
        }
    }
    get isPositiveInfinity() {
        try {
            return this.toNumber() === Infinity;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isPositiveInfinite");
        }
    }
    get isNegativeInfinity() {
        try {
            return this.toNumber() === -Infinity;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isNegativeInfinite");
        }
    }
    get isStrictlyPositive() {
        try {
            return this.toNumber() > 0;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isStrictlyPositive");
        }
    }
    get isStrictlyNegative() {
        try {
            return this.toNumber() < 0;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isStrictlyNegative");
        }
    }
    get isPositive() {
        try {
            return this.isZero || this.isStrictlyPositive;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isPositive");
        }
    }
    get isNegative() {
        try {
            return this.isZero || this.isStrictlyNegative;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isNegative");
        }
    }
    get isFiniteInteger() {
        try {
            return Number.isSafeInteger(this.toNumber());
        }
        catch (e) {
            throw new EvalError("Rational: error calling isFiniteInteger using static isSafeInteger");
        }
    }
    get isInteger() {
        try {
            return this.isFiniteInteger || this.isInfinity;
        }
        catch (e) {
            throw new EvalError("Rational: error calling isInteger");
        }
    }
    _qualifies(rawNumber) {
        try {
            return (this.bounds.isBounded(rawNumber)
                && this.cardinality.isCardinal(rawNumber));
        }
        catch (e) {
            throw new EvalError("Rational: error calling _qualifies");
        }
    }
}
module.exports = Rational;

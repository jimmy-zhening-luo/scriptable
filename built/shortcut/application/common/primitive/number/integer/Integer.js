class Integer extends Rational {
    qualifies(value) {
        return super.qualifies(value)
            && Number.isInteger(value);
    }
}
//# sourceMappingURL=Integer.js.map
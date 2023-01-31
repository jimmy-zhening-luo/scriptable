class PortValidator extends StringValidator {
    constructor(port) {
        super(port, {
            trimLeading: [
                UrlCharSet.colon,
                UrlCharSet.space
            ]
        }, UrlCharSet.numbers);
    }
}
//# sourceMappingURL=PortValidator.js.map
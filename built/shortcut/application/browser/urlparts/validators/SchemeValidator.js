class SchemeValidator extends StringValidator {
    constructor(scheme) {
        super(scheme, {
            toLower: true,
            trimTrailing: [
                UrlCharSet.slash,
                UrlCharSet.colon
            ]
        }, UrlCharSet.alphaNumericLower, UrlCharSet.plus, UrlCharSet.dot, UrlCharSet.hyphen);
    }
}
//# sourceMappingURL=SchemeValidator.js.map
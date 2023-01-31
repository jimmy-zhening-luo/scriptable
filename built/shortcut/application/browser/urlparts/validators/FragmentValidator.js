class FragmentValidator extends StringValidator {
    constructor(fragment) {
        super(fragment, {
            trimLeading: [
                UrlCharSet.hash,
                UrlCharSet.space
            ]
        });
    }
}
//# sourceMappingURL=FragmentValidator.js.map
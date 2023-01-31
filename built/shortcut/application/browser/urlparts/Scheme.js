class Scheme extends UrlPart {
    constructor(scheme) {
        super(scheme);
    }
    parse(scheme) {
        return new SchemeValidator(scheme)
            .validated;
    }
}
//# sourceMappingURL=Scheme.js.map
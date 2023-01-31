// WIP
class Fragment extends UrlPart {
    constructor(fragment, encode = true) {
        super(fragment);
        this.encode = encode;
    }
    get string() {
        return this.encode ?
            encodeURIComponent(super.string)
            : super.string;
    }
    parse(fragment) {
        return new FragmentValidator(fragment)
            .cleaned;
    }
}
//# sourceMappingURL=Fragment.js.map
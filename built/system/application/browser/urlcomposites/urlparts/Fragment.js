const fr_UrlPart = importModule("urlpart/UrlPart");
class Fragment extends fr_UrlPart {
    constructor(fragment, encode = true) {
        super(fragment);
        this.encode = encode;
    }
    parse(fragment) {
        return new Fragment._ValidFragment(fragment)
            .toString();
    }
}
(function (Fragment) {
    Fragment._ValidFragment = importModule("validators/ValidFragment");
})(Fragment || (Fragment = {}));
module.exports = Fragment;
//# sourceMappingURL=Fragment.js.map
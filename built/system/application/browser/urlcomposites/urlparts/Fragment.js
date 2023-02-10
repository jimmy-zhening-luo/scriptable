const fr_UrlPart = importModule("urlpart/UrlPart");
class Fragment extends fr_UrlPart {
    parse(fragment) {
        return (fragment.trim() === "#"
            || fragment.trim() === "") ?
            null
            : new Fragment
                ._ValidFragment(fragment)
                .value;
    }
}
(function (Fragment) {
    Fragment._ValidFragment = importModule("validators/ValidFragment");
})(Fragment || (Fragment = {}));
module.exports = Fragment;
//# sourceMappingURL=Fragment.js.map
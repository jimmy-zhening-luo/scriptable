const pqf_UrlComposite = importModule("urlcomposite/UrlComposite");
class PathQueryFragment extends pqf_UrlComposite {
    constructor(pathOrPathQueryOrPathQueryFragment, fragment) {
        super();
        this.parts = pathOrPathQueryOrPathQueryFragment === undefined ?
            [
                new PathQueryFragment._PathQuery(),
                new PathQueryFragment._Fragment()
            ]
            : pathOrPathQueryOrPathQueryFragment instanceof PathQueryFragment ?
                pathOrPathQueryOrPathQueryFragment.parts
                : Array.isArray(pathOrPathQueryOrPathQueryFragment) ?
                    [
                        new PathQueryFragment._PathQuery(new PathQueryFragment._PathQuery._Path(pathOrPathQueryOrPathQueryFragment[0]), new PathQueryFragment._PathQuery._Query(pathOrPathQueryOrPathQueryFragment[1])),
                        new PathQueryFragment._Fragment(fragment)
                    ]
                    : [
                        new PathQueryFragment._PathQuery(pathOrPathQueryOrPathQueryFragment),
                        new PathQueryFragment._Fragment(fragment)
                    ];
        this.pathQuery = this.parts[0];
        this.fragment = this.parts[1];
    }
    get composite() {
        return this.fragment.isValid ?
            [
                this.pathQuery.toString(),
                this.fragment.toString()
            ].join("#")
            : this.pathQuery.toString();
    }
}
(function (PathQueryFragment) {
    PathQueryFragment._PathQuery = importModule("PathQuery");
    PathQueryFragment._Fragment = importModule("urlparts/Fragment");
})(PathQueryFragment || (PathQueryFragment = {}));
module.exports = PathQueryFragment;
//# sourceMappingURL=PathQueryFragment.js.map
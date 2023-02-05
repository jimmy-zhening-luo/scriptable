const shppqf_UrlComposite = importModule("urlcomposite/UrlComposite");
class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
    constructor(schemeHostPortOrSchemeHostPortPathQueryFragment, pathQueryFragment) {
        super();
        this.schemeHostPort = this.parts[0];
        this.pathQueryFragment = this.parts[1];
        this.parts = schemeHostPortOrSchemeHostPortPathQueryFragment === undefined ?
            [
                new SchemeHostPortPathQueryFragment._SchemeHostPort(),
                new SchemeHostPortPathQueryFragment._PathQueryFragment()
            ]
            : schemeHostPortOrSchemeHostPortPathQueryFragment instanceof SchemeHostPortPathQueryFragment ?
                schemeHostPortOrSchemeHostPortPathQueryFragment.parts
                : Array.isArray(schemeHostPortOrSchemeHostPortPathQueryFragment) ?
                    [
                        new SchemeHostPortPathQueryFragment._SchemeHostPort(schemeHostPortOrSchemeHostPortPathQueryFragment[0], [
                            schemeHostPortOrSchemeHostPortPathQueryFragment[1],
                            schemeHostPortOrSchemeHostPortPathQueryFragment[2]
                        ]),
                        new SchemeHostPortPathQueryFragment._PathQueryFragment([
                            schemeHostPortOrSchemeHostPortPathQueryFragment[3],
                            schemeHostPortOrSchemeHostPortPathQueryFragment[4]
                        ], schemeHostPortOrSchemeHostPortPathQueryFragment[5])
                    ]
                    : [
                        new SchemeHostPortPathQueryFragment._SchemeHostPort(schemeHostPortOrSchemeHostPortPathQueryFragment),
                        new SchemeHostPortPathQueryFragment._PathQueryFragment(pathQueryFragment)
                    ];
    }
    get composite() {
        return this.schemeHostPort.isValid ?
            this.pathQueryFragment.isValid ?
                [
                    this.schemeHostPort.toString(),
                    this.pathQueryFragment.toString()
                ].join("/")
                : this.schemeHostPort.toString()
            : "";
    }
}
(function (SchemeHostPortPathQueryFragment) {
    ;
    SchemeHostPortPathQueryFragment._SchemeHostPort = importModule("SchemeHostPort");
    SchemeHostPortPathQueryFragment._PathQueryFragment = importModule("PathQueryFragment");
})(SchemeHostPortPathQueryFragment || (SchemeHostPortPathQueryFragment = {}));
module.exports = SchemeHostPortPathQueryFragment;
//# sourceMappingURL=SchemeHostPortPathQueryFragment.js.map
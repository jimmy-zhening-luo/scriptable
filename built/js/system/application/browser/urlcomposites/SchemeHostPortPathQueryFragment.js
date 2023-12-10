"use strict";
const shppqf_UrlComposite = importModule("urlcomposite/UrlComposite");
class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
    constructor(schemeHostPortOrSchemeHostPortPathQueryFragment, pathQueryFragment) {
        super();
        try {
            this.parts
                = schemeHostPortOrSchemeHostPortPathQueryFragment === undefined
                    ? [
                        new SchemeHostPortPathQueryFragment.SchemeHostPort(),
                        new SchemeHostPortPathQueryFragment.PathQueryFragment(),
                    ]
                    : schemeHostPortOrSchemeHostPortPathQueryFragment
                        instanceof SchemeHostPortPathQueryFragment
                        ? schemeHostPortOrSchemeHostPortPathQueryFragment.parts
                        : Array.isArray(schemeHostPortOrSchemeHostPortPathQueryFragment)
                            ? [
                                new SchemeHostPortPathQueryFragment.SchemeHostPort(schemeHostPortOrSchemeHostPortPathQueryFragment[0], [
                                    schemeHostPortOrSchemeHostPortPathQueryFragment[1],
                                    schemeHostPortOrSchemeHostPortPathQueryFragment[2],
                                ]),
                                new SchemeHostPortPathQueryFragment.PathQueryFragment([
                                    schemeHostPortOrSchemeHostPortPathQueryFragment[3],
                                    schemeHostPortOrSchemeHostPortPathQueryFragment[4],
                                ], schemeHostPortOrSchemeHostPortPathQueryFragment[5]),
                            ]
                            : [
                                new SchemeHostPortPathQueryFragment.SchemeHostPort(schemeHostPortOrSchemeHostPortPathQueryFragment),
                                new SchemeHostPortPathQueryFragment.PathQueryFragment(pathQueryFragment),
                            ];
            this.schemeHostPort = this.parts[0];
            this.pathQueryFragment = this.parts[1];
        }
        catch (e) {
            throw new SyntaxError(`SchemeHostPortPathQueryFragment: constructor: error creating SchemeHostPortPathQueryFragment: \n${e}`);
        }
    }
    static get SchemeHostPort() {
        try {
            return importModule("SchemeHostPort");
        }
        catch (e) {
            throw new ReferenceError(`SchemeHostPortPathQueryFragment: get SchemeHostPort: error loading SchemeHostPort module: \n${e}`);
        }
    }
    static get PathQueryFragment() {
        try {
            return importModule("PathQueryFragment");
        }
        catch (e) {
            throw new ReferenceError(`SchemeHostPortPathQueryFragment: get PathQueryFragment: error loading PathQueryFragment module: \n${e}`);
        }
    }
    static get UrlComposite() {
        try {
            return shppqf_UrlComposite;
        }
        catch (e) {
            throw new ReferenceError(`SchemeHostPortPathQueryFragment: get UrlComposite: error loading UrlComposite module: \n${e}`);
        }
    }
    get composite() {
        try {
            return this.schemeHostPort.isValid
                ? this.pathQueryFragment.isValid
                    ? [
                        this.schemeHostPort.toString(),
                        this.pathQueryFragment.toString(),
                    ].join("/")
                    : this.schemeHostPort.toString()
                : "";
        }
        catch (e) {
            throw new EvalError(`SchemeHostPortPathQueryFragment: get composite: error getting composite: \n${e}`);
        }
    }
}
module.exports = SchemeHostPortPathQueryFragment;

const shp_UrlComposite = importModule("urlcomposite/UrlComposite");
class SchemeHostPort extends shp_UrlComposite {
    constructor(schemeOrSchemeHostPort, hostPort) {
        super();
        this.scheme = this.parts[0];
        this.hostPort = this.parts[1];
        this.parts = schemeOrSchemeHostPort === undefined ?
            [
                new SchemeHostPort._Scheme(),
                new SchemeHostPort._HostPort()
            ]
            : schemeOrSchemeHostPort instanceof SchemeHostPort ?
                schemeOrSchemeHostPort.parts
                : [
                    new SchemeHostPort._Scheme(schemeOrSchemeHostPort),
                    Array.isArray(hostPort) ?
                        new SchemeHostPort._HostPort(new SchemeHostPort._HostPort._Host(hostPort[0]), new SchemeHostPort._HostPort._Port(hostPort[1]))
                        : new SchemeHostPort._HostPort(hostPort)
                ];
    }
    get composite() {
        return [
            this.scheme.toString(),
            this.hostPort.toString()
        ].join("://");
    }
}
(function (SchemeHostPort) {
    SchemeHostPort._Scheme = importModule("urlparts/Scheme");
    SchemeHostPort._HostPort = importModule("HostPort");
})(SchemeHostPort || (SchemeHostPort = {}));
module.exports = SchemeHostPort;
//# sourceMappingURL=SchemeHostPort.js.map
const hp_UrlComposite = importModule("urlcomposite/UrlComposite");
class HostPort extends hp_UrlComposite {
    constructor(hostOrHostPort, port) {
        super();
        this.host = this.parts[0];
        this.port = this.parts[1];
        this.parts = hostOrHostPort === undefined ?
            [
                new HostPort._Host(),
                new HostPort._Port()
            ]
            : hostOrHostPort instanceof HostPort ?
                hostOrHostPort.parts
                : [
                    new HostPort._Host(hostOrHostPort),
                    new HostPort._Port(port)
                ];
    }
    get composite() {
        return this.host.isValid ?
            this.port.isValid ?
                [
                    this.host.toString(),
                    this.port.toString()
                ].join(":")
                : this.host.toString()
            : "";
    }
}
(function (HostPort) {
    HostPort._Host = importModule("urlparts/Host");
    HostPort._Port = importModule("urlparts/Port");
})(HostPort || (HostPort = {}));
module.exports = HostPort;
//# sourceMappingURL=HostPort.js.map
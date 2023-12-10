"use strict";
const hp_UrlComposite = importModule("urlcomposite/UrlComposite");
class HostPort extends hp_UrlComposite {
    constructor(hostOrHostPort, port) {
        super();
        try {
            this.parts
                = hostOrHostPort === undefined
                    ? [
                        new HostPort.Host(),
                        new HostPort.Port(),
                    ]
                    : hostOrHostPort instanceof HostPort
                        ? hostOrHostPort.parts
                        : [
                            new HostPort.Host(hostOrHostPort),
                            new HostPort.Port(port),
                        ];
            this.host = this.parts[0];
            this.port = this.parts[1];
        }
        catch (e) {
            throw new SyntaxError(`HostPort: constructor: error creating HostPort: \n${e}`);
        }
    }
    static get Host() {
        try {
            return HostPort.UrlParts.Host;
        }
        catch (e) {
            throw new ReferenceError(`HostPort: get Host: error loading Host module: \n${e}`);
        }
    }
    static get Port() {
        try {
            return HostPort.UrlParts.Port;
        }
        catch (e) {
            throw new ReferenceError(`HostPort: get Port: error loading Port module: \n${e}`);
        }
    }
    static get UrlComposite() {
        try {
            return hp_UrlComposite;
        }
        catch (e) {
            throw new ReferenceError(`HostPort: get UrlComposite: error loading UrlComposite module: \n${e}`);
        }
    }
    get composite() {
        try {
            return this.host.isValid
                ? this.port.isValid
                    ? [
                        this.host.toString(),
                        this.port.toString(),
                    ].join(":")
                    : this.host.toString()
                : "";
        }
        catch (e) {
            throw new EvalError(`HostPort: get composite: error getting composite: \n${e}`);
        }
    }
}
module.exports = HostPort;

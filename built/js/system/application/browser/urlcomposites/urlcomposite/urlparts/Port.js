"use strict";
const po_UrlPart = importModule("urlpart/UrlPart");
class Port extends po_UrlPart {
    constructor(port) {
        try {
            super(typeof port === "number"
                ? Number.isInteger(port)
                    ? String(Math.round(port))
                    : ""
                : port);
        }
        catch (e) {
            throw new Error(`Port: constructor: error creating Port: \n${e}`);
        }
    }
    static get ValidPort() {
        try {
            return Port.UrlValidators.Port;
        }
        catch (e) {
            throw new ReferenceError(`Port: error loading ValidPort module: \n${e}`);
        }
    }
    static get UrlPart() {
        try {
            return po_UrlPart;
        }
        catch (e) {
            throw new ReferenceError(`Port: error loading UrlPart module: \n${e}`);
        }
    }
    toNumber(coerceEmptyPortToZero = false) {
        try {
            return this.isValid
                ? Math.abs(Math.round(Number.parseInt(this.toString())))
                : coerceEmptyPortToZero
                    ? 0
                    : NaN;
        }
        catch (e) {
            throw new Error(`Port: toNumber: error converting Port to number: \n${e}`);
        }
    }
    parse(port) {
        try {
            const parsedPortString = new Port.ValidPort(port)
                .toString();
            const parsedPortInt = Number.isInteger(Number.parseInt(parsedPortString))
                ? Math.round(Number.parseInt(parsedPortString))
                : NaN;
            return parsedPortInt >= 1 && parsedPortInt <= 65535
                ? String(Math.round(parsedPortInt))
                : null;
        }
        catch (e) {
            throw new Error(`Port: parse: error parsing Port: \n${e}`);
        }
    }
}
module.exports = Port;

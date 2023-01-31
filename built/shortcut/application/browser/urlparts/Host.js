// WIP
class Host extends UrlPart {
    constructor(host) {
        super(host);
    }
    static get IP() {
        return importModule("host/IP");
    }
    static get IPv4() {
        return Host.IP.IPv4;
    }
    static get IPv6() {
        return Host.IP.IPv6;
    }
    static get RegName() {
        return importModule("host/RegName");
    }
    parse(host) {
        return (this.parseIP(host) !== String()) ?
            this.parseIP(host)
            : (this.parseRegName(host) !== String()) ?
                this.parseRegName(host)
                : String();
    }
    parseIP(host) {
        return (this.parseIPv4(host) !== String()) ?
            this.parseIPv4(host)
            : (this.parseIPv6(host) !== String()) ?
                this.parseIPv6(host)
                : String();
    }
    parseIPv4(host) {
        return new Host.IPv4(host).string;
    }
    parseIPv6(host) {
        return new Host.IPv6(host).string;
    }
    parseRegName(host) {
        return new Host.RegName(host).string;
    }
}
//# sourceMappingURL=Host.js.map
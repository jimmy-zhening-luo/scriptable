const ho_UrlPart = importModule("urlpart/UrlPart");
class Host extends ho_UrlPart {
    parse(host) {
        host = host.trim();
        host = host.includes("://") ?
            host.split("://").slice(1).join("://")
            : host;
        return (host
            .split(".").length === 4
            && host
                .split(".")
                .map(hostRepeater => new Host._HostIPv4Repeater(hostRepeater))
                .every(hostRepeater => (hostRepeater.isValid
                && Number.parseInt(hostRepeater.toString()) <= 255))) || (host
            .split(":").length < 8
            && host
                .split(":")
                .map(hostRepeater => new Host._HostIPv6Repeater(hostRepeater))
                .every(hostRepeater => hostRepeater.isValid)) || (host
            .split(".").length >= 1
            && host
                .split(".")
                .map(hostRepeater => new Host._HostRegNameRepeater(hostRepeater))
                .every(hostRepeater => hostRepeater.isValid))
            ? host
            : "";
    }
}
(function (Host) {
    Host._HostIPv4Repeater = importModule("repeater/HostIPv4Repeater");
    Host._HostIPv6Repeater = importModule("repeater/HostIPv6Repeater");
    Host._HostRegNameRepeater = importModule("repeater/HostRegNameRepeater");
})(Host || (Host = {}));
module.exports = Host;
//# sourceMappingURL=Host.js.map
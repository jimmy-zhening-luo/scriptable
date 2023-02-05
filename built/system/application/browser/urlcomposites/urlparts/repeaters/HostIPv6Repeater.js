const hips_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class HostIPv6Repeater extends hips_UrlPartRepeater {
    parse(repeater) {
        return new HostIPv6Repeater._ValidHostIPv6Repeater(repeater).value;
    }
}
(function (HostIPv6Repeater) {
    HostIPv6Repeater._ValidHostIPv6Repeater = importModule("./system/application/browser/urlcomposites/urlparts/validators/ValidHostIPv6Repeater");
})(HostIPv6Repeater || (HostIPv6Repeater = {}));
module.exports = HostIPv6Repeater;
//# sourceMappingURL=HostIPv6Repeater.js.map
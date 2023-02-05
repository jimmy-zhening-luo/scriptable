const hipf_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class HostIPv4Repeater extends hipf_UrlPartRepeater {
    parse(repeater) {
        return new HostIPv4Repeater._ValidHostIPv4Repeater(repeater).value;
    }
}
(function (HostIPv4Repeater) {
    HostIPv4Repeater._ValidHostIPv4Repeater = importModule("./system/application/browser/urlcomposites/urlparts/validators/ValidHostIPv4Repeater");
})(HostIPv4Repeater || (HostIPv4Repeater = {}));
module.exports = HostIPv4Repeater;
//# sourceMappingURL=HostIPv4Repeater.js.map
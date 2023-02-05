const hrn_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class HostRegNameRepeater extends hrn_UrlPartRepeater {
    parse(repeater) {
        return new HostRegNameRepeater._ValidHostRegNameRepeater(repeater).value;
    }
}
(function (HostRegNameRepeater) {
    HostRegNameRepeater._ValidHostRegNameRepeater = importModule("./system/application/browser/urlcomposites/urlparts/validators/ValidHostRegNameRepeater");
})(HostRegNameRepeater || (HostRegNameRepeater = {}));
module.exports = HostRegNameRepeater;
//# sourceMappingURL=HostRegNameRepeater.js.map
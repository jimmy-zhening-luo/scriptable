"use strict";
const hrn_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class HostRegNameRepeater extends hrn_UrlPartRepeater {
    static get ValidHostRegNameRepeater() {
        try {
            return HostRegNameRepeater.UrlValidators.Host.Repeaters.RegName;
        }
        catch (e) {
            throw new ReferenceError(`HostRegNameRepeater: error loading ValidHostRegNameRepeater module: \n${e}`);
        }
    }
    static get UrlPartRepeater() {
        try {
            return hrn_UrlPartRepeater;
        }
        catch (e) {
            throw new ReferenceError(`HostRegNameRepeater: error loading parent UrlPartRepeater module: \n${e}`);
        }
    }
    parse(repeater) {
        try {
            return new HostRegNameRepeater.ValidHostRegNameRepeater(repeater).value;
        }
        catch (e) {
            throw new Error(`HostRegNameRepeater: parse: error parsing HostRegNameRepeater: \n${e}`);
        }
    }
}
module.exports = HostRegNameRepeater;

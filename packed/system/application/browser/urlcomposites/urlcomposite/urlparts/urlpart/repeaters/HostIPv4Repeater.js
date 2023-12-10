"use strict";
const hipf_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class HostIPv4Repeater extends hipf_UrlPartRepeater {
    static get ValidHostIPv4Repeater() {
        try {
            return HostIPv4Repeater.UrlValidators.Host.Repeaters.IPv4;
        }
        catch (e) {
            throw new ReferenceError(`HostIPv4Repeater: error loading ValidHostIPv4Repeater module: \n${e}`);
        }
    }
    static get UrlPartRepeater() {
        try {
            return hipf_UrlPartRepeater;
        }
        catch (e) {
            throw new ReferenceError(`HostIPv4Repeater: error loading parent UrlPartRepeater module: \n${e}`);
        }
    }
    parse(repeater) {
        try {
            return new HostIPv4Repeater.ValidHostIPv4Repeater(repeater).value;
        }
        catch (e) {
            throw new Error(`HostIPv4Repeater: parse: error parsing HostIPv4Repeater: \n${e}`);
        }
    }
}
module.exports = HostIPv4Repeater;

"use strict";
const pa_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class PathRepeater extends pa_UrlPartRepeater {
    static get ValidPathRepeater() {
        try {
            return PathRepeater.UrlValidators.Path.Repeaters.Path;
        }
        catch (e) {
            throw new ReferenceError(`PathRepeater: error loading ValidPathRepeater module: \n${e}`);
        }
    }
    static get UrlPartRepeater() {
        try {
            return pa_UrlPartRepeater;
        }
        catch (e) {
            throw new ReferenceError(`PathRepeater: error loading parent UrlPartRepeater module: \n${e}`);
        }
    }
    parse(repeater) {
        try {
            return new PathRepeater.ValidPathRepeater(repeater).value;
        }
        catch (e) {
            throw new Error(`PathRepeater: parse: error parsing PathRepeater: \n${e}`);
        }
    }
}
module.exports = PathRepeater;

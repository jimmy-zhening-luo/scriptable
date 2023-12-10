"use strict";
const qu_UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");
class QueryRepeater extends qu_UrlPartRepeater {
    static get ValidQueryRepeater() {
        try {
            return QueryRepeater.UrlValidators.Query.Repeaters.Query;
        }
        catch (e) {
            throw new ReferenceError(`QueryRepeater: error loading ValidQueryRepeater module: \n${e}`);
        }
    }
    static get UrlPartRepeater() {
        try {
            return qu_UrlPartRepeater;
        }
        catch (e) {
            throw new ReferenceError(`QueryRepeater: error loading parent UrlPartRepeater module: \n${e}`);
        }
    }
    parse(repeater) {
        try {
            return new QueryRepeater.ValidQueryRepeater(repeater).value;
        }
        catch (e) {
            throw new Error(`QueryRepeater: parse: error parsing QueryRepeater: \n${e}`);
        }
    }
}
module.exports = QueryRepeater;

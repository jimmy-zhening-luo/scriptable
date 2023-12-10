"use strict";
class Browser {
    static get Url() {
        try {
            return importModule("Url");
        }
        catch (e) {
            throw new Error(`Browser: get Url: error getting Url: \n${e}`);
        }
    }
    static get UrlParts() {
        try {
            return Browser.Url.UrlParts;
        }
        catch (e) {
            throw new Error(`Browser: get UrlParts: error getting UrlParts: \n${e}`);
        }
    }
}
module.exports = Browser;

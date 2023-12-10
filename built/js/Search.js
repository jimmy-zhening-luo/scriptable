// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";
var Search;
(function (Search_1) {
    const shortcut = importModule("system/Shortcut");
    class Search extends shortcut {
        runtime() {
            var _a;
            try {
                const query = new SearchQuery((_a = this.input.plainTexts.shift()) !== null && _a !== void 0 ? _a : "");
                const searchShortcutConfig = this.config
                    .unmerged;
                const querytag = searchShortcutConfig.user.queryTag;
                if (querytag === "" || query.searchKey === "")
                    return null;
                else {
                    const configuredSearchEngines = searchShortcutConfig.user.engineKeys
                        .map(engine => {
                        var _a;
                        return engine.urls
                            ? new BrowserSearchEngine(engine.keys, engine.urls, querytag, (_a = engine.webview) !== null && _a !== void 0 ? _a : false)
                            : engine.app === undefined
                                ? null
                                : engine.app in SupportedAppSearchEngine
                                    ? new AppSearchEngine(typeof engine.keys === "string"
                                        ? [engine.keys]
                                        : engine.keys, engine.app)
                                    : null;
                    })
                        .filter(engine => engine !== null);
                    const userIntendedSearchEngine = configuredSearchEngines.find(engine => engine.engineKeys.includes(query.searchKey));
                    return userIntendedSearchEngine === undefined
                        ? null
                        : userIntendedSearchEngine.parseQueryToAction(query);
                }
            }
            catch (e) {
                throw new EvalError(`Search: runtime: Error running app: \n${e}`);
            }
        }
    }
    Search_1.Search = Search;
    class SearchQuery {
        constructor(query) {
            var _a, _b, _c;
            try {
                const tokens = query.trim()
                    .split(" ");
                this.searchKey = (_c = (_b = (_a = tokens.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.replace(".", "")) !== null && _c !== void 0 ? _c : "";
                this.searchTerms = tokens;
            }
            catch (e) {
                throw new SyntaxError(`SearchQuery: constructor: Error creating SearchQuery object: \n${e}`);
            }
        }
    }
    let SupportedAppSearchEngine;
    (function (SupportedAppSearchEngine) {
        SupportedAppSearchEngine[SupportedAppSearchEngine["mail"] = 0] = "mail";
        SupportedAppSearchEngine[SupportedAppSearchEngine["files"] = 1] = "files";
        SupportedAppSearchEngine[SupportedAppSearchEngine["shortcuts"] = 2] = "shortcuts";
        SupportedAppSearchEngine[SupportedAppSearchEngine["bear"] = 3] = "bear";
        SupportedAppSearchEngine[SupportedAppSearchEngine["shortcut"] = 4] = "shortcut";
    })(SupportedAppSearchEngine || (SupportedAppSearchEngine = {}));
    class SearchEngine {
        constructor(configuredKeys) {
            try {
                this.engineKeys = (Array.isArray(configuredKeys)
                    ? configuredKeys
                    : [configuredKeys]).map(key => key.toLowerCase());
            }
            catch (e) {
                throw new EvalError(`SearchEngine: constructor: Error creating SearchEngine object: \n${e}`);
            }
        }
    }
    class BrowserSearchEngine extends SearchEngine {
        constructor(configuredKeys, configuredUrls, querytag, showWebview = false) {
            try {
                super(configuredKeys);
                this.engineUrls = Array.isArray(configuredUrls)
                    ? configuredUrls
                    : [configuredUrls];
                this.querytag = querytag;
                this.showWebview = showWebview;
            }
            catch (e) {
                throw new EvalError(`BrowserSearchEngine: constructor: Error creating BrowserSearchEngine object: \n${e}`);
            }
        }
        parseQueryToAction(query) {
            try {
                const urlEncodedQueryTerms = query.searchTerms
                    .map(term => term
                    .split("+")
                    .map(operand => encodeURI(operand))
                    .join("%2B"))
                    .join("+");
                const actions = this.engineUrls.map(url => url.replace(this.querytag, urlEncodedQueryTerms));
                return {
                    app: "Safari",
                    actions: this.showWebview
                        ? actions
                        : actions.reverse(),
                    showWebview: this.showWebview,
                };
            }
            catch (e) {
                throw new SyntaxError(`BrowserSearchEngine: parseQueryToAction: Error parsing query to action: \n${e}`);
            }
        }
    }
    class AppSearchEngine extends SearchEngine {
        constructor(configuredKeys, app) {
            try {
                super(configuredKeys);
                this.app = app;
            }
            catch (e) {
                throw new EvalError(`AppSearchEngine: constructor: Error creating AppSearchEngine object: \n${e}`);
            }
        }
        parseQueryToAction(query) {
            try {
                return {
                    app: this.app,
                    actions: [query.searchTerms.join(" ")],
                };
            }
            catch (e) {
                throw new SyntaxError(`AppSearchEngine: parseQueryToAction: Error parsing query to action: \n${e}`);
            }
        }
    }
})(Search || (Search = {}));
new Search.Search()
    .run();
Script.complete();

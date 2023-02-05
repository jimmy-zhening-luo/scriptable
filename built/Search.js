// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
var Search;
(function (Search_1) {
    const shortcut = importModule("system/Shortcut");
    class Search extends shortcut {
        runtime(args) {
            var _a, _b;
            const query = new SearchQuery((_b = (_a = args
                .plainTexts) === null || _a === void 0 ? void 0 : _a.shift()) !== null && _b !== void 0 ? _b : String());
            const searchShortcutConfig = this
                .config
                .unmerged;
            const querytag = searchShortcutConfig
                .user
                .queryTag;
            if (querytag === undefined
                || query.searchKey === String())
                return null;
            else {
                const configuredSearchEngines = searchShortcutConfig
                    .user
                    .engineKeys
                    .map(engine => {
                    var _a, _b, _c;
                    return engine.urls ?
                        new BrowserSearchEngine((_a = engine.keys) !== null && _a !== void 0 ? _a : [], engine.urls, querytag, (_b = engine.webview) !== null && _b !== void 0 ? _b : false)
                        : engine.app === undefined ?
                            null
                            : engine.app in SupportedAppSearchEngine ?
                                new AppSearchEngine((_c = engine.keys) !== null && _c !== void 0 ? _c : [], engine.app)
                                : null;
                }).filter(engine => engine !== null);
                const userIntendedSearchEngine = configuredSearchEngines
                    .find(engine => engine
                    .engineKeys
                    .includes(query.searchKey));
                return userIntendedSearchEngine === undefined ?
                    null
                    : userIntendedSearchEngine
                        .parseQueryToAction(query);
            }
        }
    }
    Search_1.Search = Search;
    class SearchQuery {
        constructor(query) {
            var _a, _b, _c;
            const tokens = query
                .trim()
                .split(" ");
            this.searchKey = (_c = (_b = (_a = tokens
                .shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.replace(".", "")) !== null && _c !== void 0 ? _c : String();
            this.searchTerms = tokens;
        }
    }
    let SupportedAppSearchEngine;
    (function (SupportedAppSearchEngine) {
        SupportedAppSearchEngine[SupportedAppSearchEngine["mail"] = 0] = "mail";
        SupportedAppSearchEngine[SupportedAppSearchEngine["files"] = 1] = "files";
        SupportedAppSearchEngine[SupportedAppSearchEngine["shortcuts"] = 2] = "shortcuts";
        SupportedAppSearchEngine[SupportedAppSearchEngine["bear"] = 3] = "bear";
    })(SupportedAppSearchEngine || (SupportedAppSearchEngine = {}));
    class SearchEngine {
        constructor(configuredKeys) {
            this.engineKeys = (Array.isArray(configuredKeys) ?
                configuredKeys
                : [configuredKeys]).map(key => key.toLowerCase());
        }
    }
    class BrowserSearchEngine extends SearchEngine {
        constructor(configuredKeys, configuredUrls, querytag, showWebview = false) {
            super(configuredKeys);
            this.engineUrls = Array.isArray(configuredUrls) ?
                configuredUrls
                : [configuredUrls];
            this.querytag = querytag;
            this.showWebview = showWebview === undefined ? false : showWebview;
        }
        parseQueryToAction(query) {
            const urlEncodedQueryTerms = query
                .searchTerms
                .map(term => term
                .split("+")
                .map(operand => encodeURI(operand)).join("\%2B")).join("+");
            const actions = this
                .engineUrls
                .map(url => url
                .replace(this.querytag, urlEncodedQueryTerms));
            return {
                app: "Safari",
                actions: (this.showWebview ? actions : actions.reverse()),
                showWebview: this.showWebview
            };
        }
    }
    class AppSearchEngine extends SearchEngine {
        constructor(configuredKeys, app) {
            super(configuredKeys);
            this.app = app;
        }
        parseQueryToAction(query) {
            return {
                app: this.app,
                actions: [query.searchTerms.join(" ")]
            };
        }
    }
})(Search || (Search = {}));
new Search.Search().run();
//# sourceMappingURL=Search.js.map
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic; share-sheet-inputs: plain-text;
var Search;
(function (Search_1) {
    const Program = importModule("./lib/Program");
    const Shortcut = Program.Shortcut;
    class TokenizedQuery {
        constructor(query) {
            var _a;
            const tokens = query
                .trim()
                .split(" ");
            this.key = ((_a = tokens
                .shift()) !== null && _a !== void 0 ? _a : String())
                .toLowerCase()
                .replace(".", "");
            this.terms = tokens;
        }
    }
    class Engine {
        constructor(keys) {
            this.keys = keys;
        }
    }
    class WebEngine extends Engine {
        constructor(keys, urls, querytag, webview) {
            super(keys);
            this.urls = urls;
            this.querytag = querytag;
            this.webview = webview ? webview : false;
        }
        queryToAction(query) {
            const encodedQuery = query.terms.map((term) => (term.split("+").map((operand) => (encodeURI(operand))).join("\%2B"))).join("+");
            const actions = this.urls.map((url) => (url.replace(this.querytag, encodedQuery)));
            return {
                app: "Safari",
                actions: (this.webview ? actions : actions.reverse()),
                webview: this.webview
            };
        }
    }
    let SupportedApp;
    (function (SupportedApp) {
        SupportedApp[SupportedApp["mail"] = 0] = "mail";
        SupportedApp[SupportedApp["files"] = 1] = "files";
        SupportedApp[SupportedApp["shortcuts"] = 2] = "shortcuts";
        SupportedApp[SupportedApp["bear"] = 3] = "bear";
    })(SupportedApp || (SupportedApp = {}));
    class AppEngine extends Engine {
        constructor(keys, app) {
            super(keys);
            this.app = app;
        }
        queryToAction(query) {
            return {
                app: this.app,
                actions: query.terms.join(" ")
            };
        }
    }
    class Search extends Shortcut {
        runtime(args) {
            var _a;
            const query = new TokenizedQuery((_a = args.plainTexts
                .shift()) !== null && _a !== void 0 ? _a : String());
            const config = this["config"]["unmerged"];
            const querytag = config.user
                .queryTag;
            const engines = config.user
                .engineKeys
                .map((engine) => (engine.urls ?
                new WebEngine(engine.keys, Array.isArray(engine.urls) ?
                    engine.urls
                    : [engine.urls], querytag, engine.webview)
                : (engine.app === undefined) ?
                    null
                    : new AppEngine(engine.keys, engine.app)))
                .filter((engine) => (engine !== null));
            const engine = engines
                .find((engine) => (engine.keys.includes(query.key)));
            return (engine === undefined) ?
                null
                : engine.queryToAction(query);
        }
    }
    (new Search())["run"]();
})(Search || (Search = {}));

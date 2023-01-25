// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic; share-sheet-inputs: plain-text;
var Search;
(function (Search_1) {
    const Program = importModule("./lib/Program");
    const Shortcut = Program.Shortcut;
    class App {
        constructor(name) {
            this.name = name;
        }
    }
    class MailApp extends App {
        constructor() {
            super("Mail");
        }
    }
    class FilesApp extends App {
        constructor() {
            super("Files");
        }
    }
    class ShortcutsApp extends App {
        constructor() {
            super("Shortcuts");
        }
    }
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
        run(query) {
            const encodedQuery = query.terms.map((term) => (term.split("+").map((operand) => (encodeURI(operand))).join("\%2B"))).join("+");
            const actions = this.urls.map((url) => (url.replace(this.querytag, encodedQuery)));
            return {
                app: "Safari",
                actions: (this.webview ? actions : actions.reverse()),
                webview: this.webview
            };
        }
    }
    class AppEngine extends Engine {
        constructor(keys, app) {
            super(keys);
            this.app = app;
        }
        run(query) {
            return {
                app: this.app.name,
                actions: query.terms.join(" ")
            };
        }
    }
    class Search extends Shortcut {
        runtime(args) {
            var _a;
            const query = new TokenizedQuery((_a = args.plainTexts
                .shift()) !== null && _a !== void 0 ? _a : String());
            const config = this["config"]["merged"];
            const querytag = config.queryTag;
            const appToEngine = {
                "mail": MailApp,
                "files": FilesApp,
                "shortcuts": ShortcutsApp
            };
            const engineKeys = config.engineKeys;
            const engines = engineKeys
                .map((engine) => (engine.urls ?
                new WebEngine(engine.keys, engine.urls, querytag, engine.webview)
                : new AppEngine(engine.keys, new appToEngine[engine.app]())));
            const engine = engines
                .find((engine) => (engine.keys.includes(query.key)));
            return (engine === undefined) ?
                null
                : engine.run(query);
        }
    }
    (new Search())["run"]();
})(Search || (Search = {}));

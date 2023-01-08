// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic; share-sheet-inputs: plain-text;

class App {
  #name = String();
  constructor (name = String()) {
    this.#name = name;
  }
  
  get name() {
    return this.#name;
  }
}

class MailApp extends App {
  constructor () {
    super("Mail");
  }
}

class FilesApp extends App {
  constructor () {
    super("Files");
  }
}

class ShortcutsApp extends App {
  constructor () {
    super("Shortcuts");
  }
}

class Query {
  #key = String()
  #terms = [String()];
  constructor (query = String()) {
    const tokens = query.trim().split(" ");
    this.#key = tokens.shift().toLowerCase().replace(".", "");
    this.#terms = tokens;
  }
  
  get key() {
    return this.#key;
  }
  
  get terms() {
    return this.#terms;
  }
}

class Engine {
  #keys = [String()];
  constructor(keys = [String()]) {
    this.#keys = keys;
  }
  
  get keys() {
    return this.#keys;
  }
  
  run(query = new Query(String())) {
    throw new Error("Abstract class Engine has abstract run() method.");
  }
}

class WebEngine extends Engine {
  #urls = [String()];
  #querytag = String();
  #webview = false;
  constructor (keys = [String()], urls = [String()], querytag = String(), webview = false) {
    super(keys);
    this.#urls = Array.isArray(urls)? urls : [ urls ];
    this.#querytag = querytag;
    this.#webview = webview;
  }
  
  run(query = new Query(String())) {
    const encodedQuery = query.terms.map((term) => (term.split("+").map((operand) => (encodeURI(operand))).join("\%2B"))).join("+");
    
    const actions = this.#urls.map((url) => (url.replace(this.#querytag, encodedQuery)));
    
    return {
      app: "Safari",
      actions: (this.#webview? actions : actions.reverse()),
      webview: this.#webview
    };
  }
}

class AppEngine extends Engine {
  #app = new App();
  constructor (keys = [String()], app = new App()) {
    super(keys);
    this.#app = app;
  }
  
  run(query = new Query(String())) {
    return {
      app: this.#app.name,
      actions: query.terms.join(" ")
    };
  }
}

const query = new Query(args.plainTexts.shift());

const fm = FileManager.local();
const config = JSON.parse(fm.readString(fm.joinPath(fm.bookmarkedPath("Repositories/Shortcuts/config"), "Search/search.json")));

const querytag = config.app.queryTag? config.app.queryTag : config.user.queryTag;

const appToEngine = {
  mail: MailApp,
  files: FilesApp,
  shortcuts: ShortcutsApp
};

const engines = config.user.engineKeys.map((engine) => (engine.urls? new WebEngine(engine.keys, engine.urls, querytag, engine.webview) : new AppEngine(engine.keys, new appToEngine[engine.app]())));

const engine = engines.find((engine) => (engine.keys.includes(query.key)));

if (engine !== undefined && engine !== null && engine !== []) {
  return engine.run(query);
} else {
  return null;
}
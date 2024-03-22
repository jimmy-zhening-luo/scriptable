// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class Search extends shortcut {
    public runtime(): SearchResponse | null {
      try {
        const raw: string = this
          .input
          .shortcutParameter
          ?.input ?? "";

        const query: SearchQuery = new SearchQuery(
          raw === ""
            ? this.readStorage()
            : raw,
          this
            .input
            .shortcutParameter
            ?.clip ?? "",
        );

        const setting: SearchSettings = this
          .setting
          .unmerged as SearchSettings;

        const querytag: string = setting.app?.queryTag ?? setting.user.queryTag ?? "";

        if (querytag === "" || query.searchKey === "")
          return null;
        else {
          const engines: SearchEngine[]
            = setting.user.engineKeys
              .map(engine =>
                engine.urls !== undefined
                  ? new BrowserSearchEngine(
                    engine.keys,
                    engine.urls,
                    querytag,
                    engine.browser,
                  )
                  : engine.app === undefined
                    ? null
                    : typeof engine.app === "string"
                      ? new AppSearchEngine(
                        typeof engine.keys === "string"
                          ? [engine.keys]
                          : engine.keys,
                        engine.app,
                      )
                      : null)
              .filter(engine => engine !== null) as SearchEngine[];
          const resolvedEngine: SearchEngine | undefined
            = engines.find(engine =>
              engine.keys.includes(query.searchKey));

          if (resolvedEngine !== undefined)
            this.writeStorage(query.clean);

          return resolvedEngine?.parseQueryToAction(query) ?? null;
        }
      }
      catch (e) {
        throw new EvalError(`Search: runtime: Error running app: \n${e as string}`);
      }
    }
  }

  class SearchQuery {
    public readonly searchKey: string;
    public readonly searchTerms: string[];

    constructor(
      query: string,
      clipboard: string,
    ) {
      try {
        const tokens: string[] = query
          .trim()
          .split(" ");

        if (tokens.length === 1)
          tokens
            .push(
              ...clipboard
                .trim()
                .split(" "),
            );

        this.searchKey = tokens
          .shift()
          ?.toLowerCase()
          .replace(
            ".",
            "",
          ) ?? "";

        this.searchTerms = tokens;
      }
      catch (e) {
        throw new SyntaxError(
          `SearchQuery: constructor: Error creating SearchQuery object: \n${e as string}`,
        );
      }
    }

    public get clean(): string {
      try {
        return [ this.searchKey, ...this.searchTerms ].join(" ");
      }
      catch (e) {
        throw new EvalError(
          `SearchQuery: clean: Error cleaning query: \n${e as string}`,
        );
      }
    }
  }

  interface SearchResponse {
    app: string;
    actions: string[];
    browser?: BrowserAction;
  }

  abstract class SearchEngine {
    public readonly keys: string[];

    constructor(keys: string[] | string) {
      try {
        this.keys = (
          Array.isArray(keys)
            ? keys
            : [keys]
        )
          .map(key => key.toLowerCase());
      }
      catch (e) {
        throw new EvalError(
          `SearchEngine: constructor: Error creating SearchEngine object: \n${e as string}`,
        );
      }
    }

    public abstract parseQueryToAction(query: SearchQuery): SearchResponse;
  }

  class BrowserSearchEngine extends SearchEngine {
    public readonly urls: string[];
    public readonly querytag: string;
    public readonly browser: BrowserAction;

    constructor(
      keys: string[] | string,
      urls: string[] | string,
      querytag: string,
      browser: BrowserAction = "default",
    ) {
      try {
        super(keys);
        this.urls = Array.isArray(urls)
          ? urls
          : [urls];
        this.querytag = querytag;
        this.browser = browser;
      }
      catch (e) {
        throw new EvalError(
          `BrowserSearchEngine: constructor: Error creating BrowserSearchEngine object: \n${e as string}`,
        );
      }
    }

    public parseQueryToAction(query: SearchQuery): SearchResponse {
      try {
        const urlEncodedQueryTerms: string = query.searchTerms
          .map(term =>
            term
              .split("+")
              .map(operand => encodeURI(operand))
              .join("%2B"))
          .join("+");
        const actions: string[] = this.urls.map(url =>
          url.replace(this.querytag, urlEncodedQueryTerms));

        return {
          app: "safari",
          actions: actions,
          browser: this.browser,
        };
      }
      catch (e) {
        throw new SyntaxError(
          `BrowserSearchEngine: parseQueryToAction: Error parsing query to action: \n${e as string}`,
        );
      }
    }
  }

  class AppSearchEngine extends SearchEngine {
    public readonly app: string;

    constructor(
      keys: string[],
      app: string,
    ) {
      try {
        super(keys);
        this.app = app;
      }
      catch (e) {
        throw new EvalError(
          `AppSearchEngine: constructor: Error creating AppSearchEngine object: \n${e as string}`,
        );
      }
    }

    public parseQueryToAction(query: SearchQuery): SearchResponse {
      try {
        return {
          app: this.app,
          actions: [
            query
              .searchTerms
              .join(" "),
          ],
        };
      }
      catch (e) {
        throw new SyntaxError(
          `AppSearchEngine: parseQueryToAction: Error parsing query to action: \n${e as string}`,
        );
      }
    }
  }
}

new Search.Search()
  .run();
Script.complete();

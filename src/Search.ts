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
        const query: SearchQuery = new SearchQuery(
          this.input.plainTexts[0] ?? "",
          this.input.plainTexts[1] ?? "",
        );

        const config: SearchProto = this
          .config
          .unmerged as SearchProto;

        const querytag: string = config.app?.queryTag ?? config.user.queryTag ?? "";

        if (querytag === "" || query.searchKey === "")
          return null;
        else {
          const engines: SearchEngine[]
            = config.user.engineKeys
              .map(engine =>
                engine.urls
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
              engine.engineKeys.includes(query.searchKey));

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

        if (tokens.length <= 1)
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
  }

  interface SearchResponse {
    app: string;
    actions: string[];
    browser?: BrowserAction;
  }

  abstract class SearchEngine {
    public readonly engineKeys: string[];

    constructor(configuredKeys: string[] | string) {
      try {
        this.engineKeys = (
          Array.isArray(configuredKeys)
            ? configuredKeys
            : [configuredKeys]
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
    public readonly engineUrls: string[];
    public readonly querytag: string;
    public readonly browser: BrowserAction;

    constructor(
      configuredKeys: string[] | string,
      configuredUrls: string[] | string,
      querytag: string,
      browser: BrowserAction = "default",
    ) {
      try {
        super(configuredKeys);
        this.engineUrls = Array.isArray(configuredUrls)
          ? configuredUrls
          : [configuredUrls];
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
        const actions: string[] = this.engineUrls.map(url =>
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
      configuredKeys: string[],
      app: string,
    ) {
      try {
        super(configuredKeys);
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

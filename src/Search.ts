// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class Search extends shortcut {
    public runtime(): null | SearchResponse {
      try {
        const raw: string = this.input
          .shortcutParameter
          ?.input ?? "";

        const query: SearchQuery = new SearchQuery(
          raw === ""
            ? this.readStorage()
            : raw,
          this.input
            .shortcutParameter
            ?.clip ?? "",
        );

        const setting: SearchSettings = this
          .setting
          .unmerged as SearchSettings;

        const querytag: string = setting.app?.queryTag ?? setting.user.queryTag ?? "";

        if (querytag === "" || query.key === "")
          return null;
        else {
          const engines: SearchEngine[] = setting
            .user
            .engineKeys
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
                  : new AppSearchEngine(
                    engine.keys,
                    engine.app,
                  )
              )
              .filter(engine => engine !== null) as SearchEngine[];
          const resolvedEngine: undefined | SearchEngine
            = engines.find(engine =>
              engine
                .keys
                .includes(
                  query.key
                )
            );

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
    public readonly key: string;
    public readonly terms: string[];

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

        this.key = tokens
          .shift()
          ?.toLowerCase()
          .replace(
            ".",
            "",
          ) ?? "";

        this.terms = tokens;
      }
      catch (e) {
        throw new SyntaxError(
          `SearchQuery: constructor: Error creating SearchQuery object: \n${e as string}`,
        );
      }
    }

    public get clean(): string {
      try {
        return [
          this.key,
          ...this.terms
        ]
          .join(" ");
      }
      catch (e) {
        throw new EvalError(
          `SearchQuery: clean: Error cleaning query: \n${e as string}`,
        );
      }
    }
  }

  abstract class SearchEngine {
    public readonly keys: string[];

    constructor(keys: string | string[]) {
      try {
        this.keys = [keys]
          .flat()
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
      keys: string | string[],
      urls: string | string[],
      querytag: string,
      browser: BrowserAction = "default",
    ) {
      try {
        super(keys);
        this.urls = [urls].flat();
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
        const urlEncodedQueryTerms: string = query
          .terms
          .map(term =>
            term
              .split("+")
              .map(operand =>
                encodeURI(operand)
              )
              .join("%2B")
          )
          .join("+");
        const actions: string[] = this
          .urls
          .map(url =>
            url.replace(
              this.querytag,
              urlEncodedQueryTerms
            )
          );

        return {
          query: {
            key: query.key,
            terms: query.terms,
          },
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
      keys: string | string[],
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
          query: {
            key: query.key,
            terms: query.terms,
          },
          app: this.app,
          actions: [
            query
              .terms
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

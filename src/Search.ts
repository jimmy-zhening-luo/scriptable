// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class Search extends shortcut<
    SearchInput,
    null | SearchOutput,
    SearchSettings
  > {
    public runtime(): null | SearchOutput {
      try {
        const raw: null | SearchInput = this.input;

        const query: SearchQuery = new SearchQuery(
          !raw || raw.input === ""
            ? this.readStorage()
            : raw.input,
          raw?.clip ?? "",
        );

        const {
          app,
          user,
        }: SearchSettings = this
          .setting
          .unmerged;

        const tag: string = app?.queryTag ?? user.queryTag ?? "";

        if (tag === "" || query.key === "")
          return null;
        else {
          const engines: SearchEngine[] = user
            .engines
            .map(engine =>
              "keys" in engine
                ? "urls" in engine
                  ? new BrowserSearchEngine(
                    engine.keys,
                    engine.urls,
                    tag,
                    engine.browser,
                  )
                  : "app" in engine
                    ? new AppSearchEngine(
                      engine.keys,
                      engine.app,
                    )
                    : null
                : null)
            .filter(engine => engine !== null) as SearchEngine[];
          const resolved: null | SearchEngine
            = engines.find(engine =>
              engine
                .keys
                .includes(
                  query.key,
                )) ?? null;

          if (resolved !== null)
            this.writeStorage(query.clean);

          return resolved?.parseQueryToAction(query) ?? null;
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
      clip: string,
    ) {
      try {
        const tokens: string[] = query
          .trim()
          .split(" ");

        if (tokens.length === 1)
          tokens
            .push(
              ...clip
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
          ...this.terms,
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

    public abstract parseQueryToAction(query: SearchQuery): SearchOutput;
  }

  class BrowserSearchEngine extends SearchEngine {
    public readonly urls: string[];
    public readonly tag: string;
    public readonly browser: BrowserAction;

    constructor(
      keys: string | string[],
      urls: string | string[],
      tag: string,
      browser: BrowserAction = "default",
    ) {
      try {
        super(keys);
        this.urls = [urls].flat();
        this.tag = tag;
        this.browser = browser;
      }
      catch (e) {
        throw new EvalError(
          `BrowserSearchEngine: constructor: Error creating BrowserSearchEngine object: \n${e as string}`,
        );
      }
    }

    public parseQueryToAction(query: SearchQuery): SearchOutput {
      try {
        const urlEncodedQueryTerms: string = query
          .terms
          .map(term =>
            term
              .split("+")
              .map(operand =>
                encodeURI(operand))
              .join("%2B"))
          .join("+");
        const actions: string[] = this
          .urls
          .map(url =>
            url.replace(
              this.tag,
              urlEncodedQueryTerms,
            ));

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

    public parseQueryToAction(query: SearchQuery): SearchOutput {
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

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";
namespace Search {
  const shortcut: typeof Shortcut = importModule("system/Shortcut");

  export class Search extends shortcut {
    runtime(): SearchResponse | null {
      try {
        const query: SearchQuery = new SearchQuery(
          this.input.plainTexts.shift() ?? "",
        );

        const searchShortcutConfig: SearchProto = this.config
          .unmerged as SearchProto;
        const querytag: undefined | string = searchShortcutConfig.user.queryTag;
        if (querytag === "" || query.searchKey === "") return null;
        else {
          const configuredSearchEngines: SearchEngine[] =
            searchShortcutConfig.user.engineKeys
              .map(engine =>
                engine.urls
                  ? new BrowserSearchEngine(
                      engine.keys,
                      engine.urls,
                      querytag,
                      engine.webview ?? false,
                    )
                  : engine.app === undefined
                  ? null
                  : engine.app in SupportedAppSearchEngine
                  ? new AppSearchEngine(
                      typeof engine.keys === "string"
                        ? [engine.keys]
                        : engine.keys,
                      engine.app,
                    )
                  : null,
              )
              .filter(engine => engine !== null) as SearchEngine[];
          const userIntendedSearchEngine: SearchEngine | undefined =
            configuredSearchEngines.find(engine =>
              engine.engineKeys.includes(query.searchKey),
            );
          return userIntendedSearchEngine === undefined
            ? null
            : userIntendedSearchEngine.parseQueryToAction(query);
        }
      } catch (e) {
        throw new Error(`Search: runtime: Error running app: \n${e}`);
      }
    }
  }

  class SearchQuery {
    readonly searchKey: string;
    readonly searchTerms: string[];

    constructor(query: string) {
      try {
        const tokens: string[] = query.trim().split(" ");
        this.searchKey = tokens.shift()?.toLowerCase()?.replace(".", "") ?? "";
        this.searchTerms = tokens;
      } catch (e) {
        throw new Error(
          `SearchQuery: constructor: Error creating SearchQuery object: \n${e}`,
        );
      }
    }
  }

  interface SearchResponse {
    app: string;
    actions: string[];
    showWebview?: boolean;
  }

  enum SupportedAppSearchEngine {
    mail,
    files,
    shortcuts,
    bear,
    shortcut,
  }

  abstract class SearchEngine {
    readonly engineKeys: string[];

    constructor(configuredKeys: string[] | string) {
      try {
        this.engineKeys = (
          Array.isArray(configuredKeys) ? configuredKeys : [configuredKeys]
        ).map(key => key.toLowerCase());
      } catch (e) {
        throw new Error(
          `SearchEngine: constructor: Error creating SearchEngine object: \n${e}`,
        );
      }
    }

    abstract parseQueryToAction(query: SearchQuery): SearchResponse;
  }

  class BrowserSearchEngine extends SearchEngine {
    readonly engineUrls: string[];
    readonly querytag: string;
    readonly showWebview: boolean;

    constructor(
      configuredKeys: string[] | string,
      configuredUrls: string[] | string,
      querytag: string,
      showWebview: boolean = false,
    ) {
      try {
        super(configuredKeys);
        this.engineUrls = Array.isArray(configuredUrls)
          ? configuredUrls
          : [configuredUrls];
        this.querytag = querytag;
        this.showWebview = showWebview;
      } catch (e) {
        throw new Error(
          `BrowserSearchEngine: constructor: Error creating BrowserSearchEngine object: \n${e}`,
        );
      }
    }

    parseQueryToAction(query: SearchQuery): SearchResponse {
      try {
        const urlEncodedQueryTerms: string = query.searchTerms
          .map(term =>
            term
              .split("+")
              .map(operand => encodeURI(operand))
              .join("%2B"),
          )
          .join("+");
        const actions: string[] = this.engineUrls.map(url =>
          url.replace(this.querytag, urlEncodedQueryTerms),
        );
        return {
          app: "Safari",
          actions: this.showWebview ? actions : actions.reverse(),
          showWebview: this.showWebview,
        };
      } catch (e) {
        throw new Error(
          `BrowserSearchEngine: parseQueryToAction: Error parsing query to action: \n${e}`,
        );
      }
    }
  }

  class AppSearchEngine extends SearchEngine {
    readonly app: keyof typeof SupportedAppSearchEngine;

    constructor(
      configuredKeys: string[],
      app: keyof typeof SupportedAppSearchEngine,
    ) {
      try {
        super(configuredKeys);
        this.app = app;
      } catch (e) {
        throw new Error(
          `AppSearchEngine: constructor: Error creating AppSearchEngine object: \n${e}`,
        );
      }
    }

    parseQueryToAction(query: SearchQuery): SearchResponse {
      try {
        return {
          app: this.app,
          actions: [query.searchTerms.join(" ")],
        };
      } catch (e) {
        throw new Error(
          `AppSearchEngine: parseQueryToAction: Error parsing query to action: \n${e}`,
        );
      }
    }
  }
}

new Search.Search().run();

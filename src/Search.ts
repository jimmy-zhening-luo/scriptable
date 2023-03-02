// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
namespace Search {
  const shortcut: typeof Shortcut = importModule("system/Shortcut");

  export class Search extends shortcut {
    runtime(): SearchResponse | null {
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
    }
  }

  class SearchQuery {
    readonly searchKey: string;
    readonly searchTerms: string[];

    constructor(query: string) {
      const tokens: string[] = query.trim().split(" ");
      this.searchKey = tokens.shift()?.toLowerCase()?.replace(".", "") ?? "";
      this.searchTerms = tokens;
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
      this.engineKeys = (
        Array.isArray(configuredKeys) ? configuredKeys : [configuredKeys]
      ).map(key => key.toLowerCase());
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
      super(configuredKeys);
      this.engineUrls = Array.isArray(configuredUrls)
        ? configuredUrls
        : [configuredUrls];
      this.querytag = querytag;
      this.showWebview = showWebview;
    }

    parseQueryToAction(query: SearchQuery): SearchResponse {
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
    }
  }

  class AppSearchEngine extends SearchEngine {
    readonly app: keyof typeof SupportedAppSearchEngine;

    constructor(
      configuredKeys: string[],
      app: keyof typeof SupportedAppSearchEngine,
    ) {
      super(configuredKeys);
      this.app = app;
    }

    parseQueryToAction(query: SearchQuery): SearchResponse {
      return {
        app: this.app,
        actions: [query.searchTerms.join(" ")],
      };
    }
  }
}

new Search.Search().run();

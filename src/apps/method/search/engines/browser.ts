import type { SearchEngine, Query } from "./engine";

const bSearchEngine = importModule<typeof SearchEngine>("./engine");

class BrowserEngine extends bSearchEngine<"browser"> {
  private readonly urls: readonly stringful[];
  private readonly TAG: stringful;
  private readonly separator: string;
  private readonly encodeComponent: boolean;
  private readonly force: boolean;
  private readonly inprivate: Null<true>;

  constructor(
    urls: Unflat,
    TAG: stringful,
    separator = "+",
    encodeComponent = false,
    api = false,
    force = false,
    inprivate = false,
  ) {
    super(
      "browser",
      api ? "api" : "browser",
      api,
    );
    this.urls = typeof urls === "string" ? [urls] : urls;
    
    if (this.urls.length < 1)
      throw new TypeError("No engine URLs");
    else if (api && this.urls.length > 1)
      throw new TypeError("API cannot call multiple URLs");

    this.TAG = TAG;
    this.separator = separator;
    this.encodeComponent = encodeComponent;
    this.force = force;
    this.inprivate = inprivate || null;
  }

  protected override stringify(query: Query) {
    const { TAG, encodeComponent } = this,
    encodedQuery = query.terms
      .map(term => term
        .split("+")
        .map(c => encodeComponent ? encodeURI(c) : encodeURIComponent(c))
        .join("%2B"))
      .join(this.separator),
    actions = this.urls.map(url => url.replace(TAG, encodedQuery));

    return this.force && this.browser !== "api"
      ? actions.map(action => `data:text/html,<meta name="color-scheme" content="dark light" />
      <meta http-equiv="Refresh" content="0; url=${action}" />`)
      : actions;
  }

  protected optional(query: Query) {
    const { inprivate } = this,
    { natural } = query;

    return { natural, inprivate };
  }
}

module.exports = BrowserEngine;
export type { BrowserEngine as default };

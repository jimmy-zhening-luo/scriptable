import SearchEngine from "./engine";
import type Query from "../query";

class BrowserEngine extends SearchEngine<"browser"> {
  private readonly urls: readonly string[];
  private readonly TAG: stringful;
  private readonly separator: string;
  private readonly encodeComponent: boolean;
  private readonly force: boolean;
  private readonly inprivate: Null<true>;

  constructor(
    urls: Unflat,
    latlong: stringful,
    [TAG, LTAG]: Dyad<stringful>,
    separator = "+",
    encodeComponent = false,
    api = false,
    force = false,
    inprivate = false,
  ) {
    super(
      "browser",
      "browser",
      api,
    );
    this.urls = (typeof urls === "string" ? [urls] : urls).map(url => url.replaceAll(LTAG, latlong));

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
    const {
      TAG,
      encodeComponent,
    } = this,
    encodedQuery = query.terms
      .map(term => term
        .split("+")
        .map(c => encodeComponent ? encodeURI(c) : encodeURIComponent(c))
        .join("%2B"))
      .join(this.separator),
    actions = this.urls.map(url => url.replaceAll(TAG, encodedQuery));

    return !this.output && this.force
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

export default BrowserEngine;

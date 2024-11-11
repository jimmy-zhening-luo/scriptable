import SearchEngine from ".";
import type Query from "../query";

class WebEngine<
  T extends (
    | "api"
    | "browser"
  ),
> extends SearchEngine<T> {
  private readonly urls: readonly string[];
  private readonly TAG: stringful;
  private readonly separator: string;
  private readonly encodeComponent: boolean;
  private readonly force: boolean;
  private readonly inprivate: Null<true>;

  constructor(
    webapp: T,
    urls: Unflat,
    latlong: string,
    [TAG, LTAG]: Dyad<stringful>,
    separator = "+",
    encodeComponent = false,
    force = false,
    inprivate = false,
  ) {
    super(
      webapp,
      webapp,
      webapp === "api",
    );
    this.urls = (typeof urls === "string" ? [urls] : urls).map(url => url.replace(LTAG, latlong));
    this.TAG = TAG;
    this.separator = separator;
    this.encodeComponent = encodeComponent;
    this.force = force;
    this.inprivate = inprivate || null;
  }

  protected override optional = (query: Query) => {
    const { inprivate } = this,
    { natural } = query;

    return { natural, inprivate };
  };

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
    actions = this.urls.map(url => url.replace(TAG, encodedQuery));

    return this.force
      ? actions.map(action => `data:text/html,<meta name="color-scheme" content="dark light" />
      <meta http-equiv="Refresh" content="0; url=${action}" />`)
      : actions;
  }
}

export default WebEngine;

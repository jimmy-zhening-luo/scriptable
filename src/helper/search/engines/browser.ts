import SearchEngine from "./engine";
import type Query from "../query";

class BrowserEngine extends SearchEngine<"browser"> {
  private readonly urls: readonly string[];
  private schemes: readonly string[];
  private readonly TAG: stringful;
  private readonly separator: string;
  private readonly encodeComponent: boolean;
  private readonly api: Null<true>;
  private readonly force: boolean;
  private readonly inprivate: Null<true>;

  constructor(
    urls: string | (string | Field<"scheme">)[],
    TAG: stringful,
    separator = "+",
    encodeComponent = false,
    api = false,
    force = false,
    inprivate = false,
  ) {
    super(
      "browser",
      api ? "api" : "",
      api,
    );
    ({
      urls: this.urls,
      schemes: this.schemes = [],
    } = typeof urls === "string"
      ? { urls: [urls] }
      : urls.reduce(
        (stack, url): Record<"urls" | "schemes", string[]> => typeof url === "string"
          ? stack.urls.push(url)
          : stack.schemes.push(url.scheme),
        {
          urls: [] as string[],
          schemes: [] as string[],
        } as const,
      ));

    if (this.urls.length < 1 && this.schemes.length < 1)
      throw new TypeError("No engine URLs");
    else if (api && this.urls.length !== 1)
      throw new TypeError("API must call exactly one URL");

    this.TAG = TAG;
    this.separator = separator;
    this.encodeComponent = encodeComponent;
    this.api = api || null;
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

    this.schemes = this.schemes.map(scheme => scheme.replace(TAG, encodedQuery));

    return this.force && !this.api
      ? actions.map(action => `data:text/html,<meta name="color-scheme" content="dark light" />
      <meta http-equiv="Refresh" content="0; url=${action}" />`)
      : actions;
  }

  protected optional(query: Query) {
    const { api, inprivate, schemes } = this,
    { natural } = query;

    return { natural, api, inprivate, schemes };
  }
}

export default BrowserEngine;

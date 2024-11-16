class SearchEngine<
  T extends (
    | "api"
    | "browser"
    | "find"
    | "shortcut"
  ),
> {
  private readonly engine;
  private readonly urls;
  private readonly tag;
  private readonly output: Null<true>;

  constructor(
    protected readonly type: T,
    engineOrUrls: T extends "browser"
      ? Unflat
      : string,
    outputOrTag:
      | boolean
      | T extends ("browser" | "api")
        ? stringful
        : boolean = false,
    private readonly separator = "+",
    private readonly encodeComponent = false,
    private readonly force = false,
  ) {
    const web = type === "api" || type === "browser";

    ({
      engine: this.engine = null,
      urls: this.urls = null,
      tag: this.tag = null,
      output: this.output,
    } = web
      ? {
          urls: typeof engineOrUrls === "string" ? [engineOrUrls] : engineOrUrls as string[],
          tag: outputOrTag as stringful,
          output: type === "api" ? true : null,
        }
      : {
          engine: engineOrUrls as string,
          output: (outputOrTag as boolean) || null,
        }
    );
  }

  public resolve(
    key: stringful,
    terms: stringful[],
    question: string,
  ) {
    const {
      type,
      engine,
      urls,
      output,
    } = this,

    return {
      type,
      engine: engine === "" ? key : engine,
      question,
      urls: urls === null
        ? urls
        : this.encode(urls, terms)
      output,
    };
  }

  private encode(
    urls: string[],
    terms: stringful[],
  ) {
    const { tag, encodeComponent } = this,
    encodedQuery = terms
      .map(term => term
        .split("+")
        .map(c => encodeComponent ? encodeURI(c) : encodeURIComponent(c))
        .join("%2B"))
      .join(this.separator),
    U = urls.map(url => url.replace(tag, encodedQuery));

    return this.force
      ? U.map(url => `data:text/html,<meta name="color-scheme" content="dark light" />
      <meta http-equiv="Refresh" content="0; url=${url}" />`)
      : U;
  }
}

export default SearchEngine;

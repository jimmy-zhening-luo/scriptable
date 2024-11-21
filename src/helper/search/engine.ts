export default class SearchEngine<
  T extends (
    | "api"
    | "browser"
    | "find"
    | "shortcut"
  ),
> {
  private readonly engine: Null<string>;
  private readonly urls: Null<readonly string[]>;
  private readonly tag: Null<stringful>;
  private readonly output: Null<true>;

  constructor(
    protected readonly type: T,
    engineOrUrls: T extends "browser"
      ? Unflat
      : string,
    outputOrTag:
      | boolean
      | (T extends ("browser" | "api") ? stringful : boolean) = false,
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
    terms: readonly stringful[],
    question: string,
  ) {
    const {
      type,
      engine,
      urls,
      output,
    } = this;

    return {
      type,
      engine: engine === "" ? key : engine,
      question,
      urls: urls === null
        ? urls
        : this.encode(urls, terms),
      output,
    };
  }

  private encode(
    urls: readonly string[],
    terms: readonly stringful[],
  ) {
    const { tag, encodeComponent } = this,
    encodedQuery = terms
      .map(term => term
        .split("+")
        .map(c => encodeComponent ? encodeURI(c) : encodeURIComponent(c))
        .join("%2B"))
      .join(this.separator),
    U = urls.map(url => url.replace(tag as stringful, encodedQuery));

    return this.force
      ? U.map(url => `data:text/html,<meta name="color-scheme" content="dark light" />
      <meta http-equiv="Refresh" content="0; url=${url}" />`)
      : U;
  }
}

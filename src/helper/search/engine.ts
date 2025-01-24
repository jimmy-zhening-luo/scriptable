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
  private readonly notify: Null<true>;

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
      notify: this.notify,
    } = web
      ? {
          urls: typeof engineOrUrls === "string" ? [engineOrUrls] : engineOrUrls as string[],
          tag: outputOrTag as stringful,
          notify: type === "api" ? true : null,
        }
      : {
          engine: engineOrUrls as string,
          notify: (outputOrTag as boolean) || null,
        }
    );
  }

  public resolve(
    key: stringful,
    terms: readonly stringful[],
    question: string,
  ) {
    function encode(
      urls: readonly string[],
      terms: readonly stringful[],
      tag: stringful,
      separator: string,
      encodeComponent: boolean,
      force: boolean,
    ) {
      const encodedQuery = terms
        .map(term => term
          .split("+")
          .map(c => encodeComponent ? encodeURI(c) : encodeURIComponent(c))
          .join("%2B"))
        .join(separator),
      U = urls.map(url => url.replace(tag, encodedQuery));

      return !force
        ? U
        : U.map(url => `data:text/html,<meta name="color-scheme" content="dark light" />
        <meta http-equiv="Refresh" content="0; url=${url}" />`);
    }

    const {
      type,
      notify,
      engine,
      urls,
      tag,
      separator,
      encodeComponent,
      force,
    } = this;

    return {
      type,
      notify,
      engine: engine === "" ? key : engine,
      question,
      urls: urls === null
        ? urls
        : encode(
            urls,
            terms,
            tag as unknown as stringful,
            separator,
            encodeComponent,
            force,
          ),
    };
  }
}

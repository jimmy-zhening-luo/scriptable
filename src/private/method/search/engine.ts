export default class SearchEngine<
  T extends (
    | "browser"
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
      | (T extends "browser" ? stringful : boolean) = false,
    private readonly separator = "+",
    private readonly force = false,
  ) {
    ({
      engine: this.engine = null,
      urls: this.urls = null,
      tag: this.tag = null,
      notify: this.notify,
    } = type === "browser"
      ? {
          urls: typeof engineOrUrls === "string"
            ? [engineOrUrls]
            : engineOrUrls as string[],
          tag: outputOrTag as stringful,
          notify: null,
        }
      : {
          engine: engineOrUrls as string,
          notify: (outputOrTag as boolean)
            || null,
        }
    );
  }

  public resolve(
    key: stringful,
    terms: readonly stringful[],
    question: Null<stringful>,
  ) {
    function encode(
      urls: readonly string[],
      terms: readonly stringful[],
      tag: stringful,
      separator: string,
      force: boolean,
    ) {
      const encodedUrls = urls
        .map(
          url => url
            .replace(
              tag,
              terms
                .map(
                  term => term
                    .split("+")
                    .map(c => encodeURI(c))
                    .join("%2B"),
                )
                .join(separator),
            ),
        );

      return !force
        ? encodedUrls
        : encodedUrls
          .map(url => `data:text/html,<meta http-equiv="refresh" content="0;url=${url}">`);
    }

    const engine = this.engine === ""
      ? key
      : this.engine;

    return {
      type: this.type,
      engine,
      question,
      urls: this.urls === null
        ? null
        : encode(
            this.urls,
            terms,
            this.tag!,
            this.separator,
            this.force,
          ),
      notify: this.notify,
      label: question
        ?? engine
        ?? "",
    };
  }
}

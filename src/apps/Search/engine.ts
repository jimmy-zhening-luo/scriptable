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
  private readonly force: boolean;
  private readonly encode: boolean;

  constructor(
    protected readonly type: T,
    engineOrUrls: T extends "browser"
      ? Unflat
      : string,
    notifyOrTag:
      | boolean
      | (T extends "browser" ? stringful : boolean) = false,
    private readonly prepend = "",
    forceOrEncode = false,
    private readonly separator = "+",
  ) {
    ({
      engine: this.engine = null,
      urls: this.urls = null,
      tag: this.tag = null,
      notify: this.notify = null,
      force: this.force = false,
      encode: this.encode = false,
    } = type === "browser"
      ? {
          urls: typeof engineOrUrls === "string"
            ? [engineOrUrls]
            : engineOrUrls as string[],
          tag: notifyOrTag as stringful,
          force: forceOrEncode,
        }
      : {
          engine: engineOrUrls as string,
          notify: (notifyOrTag as boolean)
            || null,
          encode: forceOrEncode,
        }
    );
  }

  public resolve(
    key: stringful,
    parsedTerms: readonly stringful[],
  ) {
    function encode(
      terms: readonly stringful[],
      separator: string,
      browserOptions?: {
        urls: readonly string[];
        tag: stringful;
        force: boolean;
      },
    ) {
      const action = terms
        .map(term => encodeURIComponent(term))
        .join(separator);

      return typeof browserOptions === "undefined"
        ? action === ""
          ? null
          : action as stringful
        : browserOptions
            .urls
            .map(
              url => url.replace(
                browserOptions.tag,
                action,
              ),
            )
            .map(
              url => browserOptions.force
                ? `data:text/html,%3Cmeta%20http-equiv=%22refresh%22%20content=%220;url=${url}%22%3E`
                : url,
            );
    }

    const engine = this.engine === ""
      ? key
      : this.engine,
    terms = this.prepend === ""
      ? parsedTerms
      : [
          ...this
            .prepend
            .split(" ")
            .filter((term): term is stringful => term !== ""),
          ...terms,
        ] as const,
    termstring = terms.join(" ");

    return {
      engine,
      action: this.type === "browser"
        ? encode(
            terms,
            this.separator,
            {
              urls: this.urls!,
              tag: this.tag!,
              force: this.force,
            },
          )
        : this.encode
          ? encode(
              terms,
              this.separator,
            )
          : termstring,
      notify: this.notify,
      label: termstring.length !== 0
        ? termstring
        : (engine ?? this.type),
    };
  }
}

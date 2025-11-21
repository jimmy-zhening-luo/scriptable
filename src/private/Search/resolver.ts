import type { Setting } from "./types";

export function resolver(
  engine: Setting["engines"][stringful],
  parsed: {
    key: stringful;
    terms: stringful[];
  },
) {
  const options = typeof engine === "string"
    || Array.isArray(engine)
    ? { url: engine }
    : engine;

  const enum TermSeparator {
    Print = " ",
    Url = "+",
  }

  if (options.prepend !== undefined)
    void parsed.terms.unshift(
      ...options.prepend.split(TermSeparator.Print) as stringful[],
    );

  function encode(
    terms: readonly stringful[],
    options: {
      url?: Unflat;
      force?: boolean;
      separator?: string;
    },
  ) {
    const action = terms
      .map(encodeURIComponent)
      .join(
        options.separator
        ?? TermSeparator.Url,
      );

    if (options.url === undefined)
      return action || null as Null<stringful>;

    const enum UrlEncode {
      QueryParam = "%s",
      SerializeStart = 'data:text/html,<meta http-equiv=refresh content="0;url=',
      SerializeEnd = '">',
    }

    const replace = (url: string) => url.replace(
      UrlEncode.QueryParam,
      action,
    ) as stringful;

    function force(url: stringful) {
      return (
        UrlEncode.SerializeStart
        + url
        + UrlEncode.SerializeEnd
      ) as stringful;
    }

    return Array.isArray(options.url)
      ? options.force
        ? options
            .url
            .map(replace)
            .map(force)
        : options
            .url
            .map(replace)
      : options.force
        ? force(replace(options.url))
        : replace(options.url);
  }

  if ("url" in options)
    return {
      action: encode(parsed.terms, options),
    };

  const print = parsed
    .terms
    .join(TermSeparator.Print)
    || null as Null<stringful>,
  notify = options.notify || null;

  return {
    app: options.shortcut as Undefined<stringful> ?? parsed.key,
    action: options.encode
      ? encode(parsed.terms, options)
      : print,
    notify,
    label: notify && print,
    noSave: options.noSave ?? null,
  };
}

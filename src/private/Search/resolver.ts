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

  function join(
    terms: readonly stringful[],
    separator: string = TermSeparator.Print,
  ) {
    return terms.length === 0
      ? null
      : terms.join(separator) as stringful;
  }

  function encode(
    terms: readonly stringful[],
    options: {
      url?: Unflat;
      force?: boolean;
      separator?: string;
    },
  ) {
    const action = join(
      terms.map(encodeURIComponent) as readonly stringful[],
      options.separator
      ?? TermSeparator.Url,
    );

    if (options.url === undefined)
      return action;

    const enum UrlEncode {
      QueryParam = "%s",
      SerializeStart = 'data:text/html,<meta http-equiv=refresh content="0;url=',
      SerializeEnd = '">',
    }

    const queryParam = action ?? "",
    replace = (url: string) => url.replace(
      UrlEncode.QueryParam,
      queryParam,
    ) as stringful;

    function force(url: stringful) {
      return (
        UrlEncode.SerializeStart
        + url
        + UrlEncode.SerializeEnd
      ) as stringful;
    }

    return Array.isArray(options.url)
      ? options.force === true
        ? options
            .url
            .map(replace)
            .map(force)
        : options
            .url
            .map(replace)
      : options.force === true
        ? force(replace(options.url))
        : replace(options.url);
  }

  if ("url" in options)
    return {
      action: encode(parsed.terms, options),
    };

  const query = join(parsed.terms);

  return {
    app: options.shortcut as Undefined<stringful> ?? parsed.key,
    action: options.encode === true
      ? encode(terms, options)
      : query,
    notify: options.notify! || null as Null<true>,
    label: options.notify === true
      ? query
      : null,
    noSave: options.noSave ?? null,
  };
}

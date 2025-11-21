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

  if (options.prepend)
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

    if (!options.url)
      return action as stringful || null;

    const enum UrlEncode {
      QueryParam = "%s",
      SerializeStart = 'data:text/html,<meta http-equiv=refresh content="0;url=',
      SerializeEnd = '">',
    }

    function replace(
      query: string,
      url: stringful,
    ) {
        return url.replace(
          UrlEncode.QueryParam,
          query,
        ) as stringful;
    }

    const plug = replace.bind(null, action);

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
            .map(plug)
            .map(force)
        : options
            .url
            .map(plug)
      : options.force
        ? force(plug(options.url))
        : plug(options.url);
  }

  if ("url" in options)
    return {
      action: encode(parsed.terms, options),
    };

  const print = parsed
    .terms
    .join(TermSeparator.Print) as stringful
    || null,
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

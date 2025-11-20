import type { Setting } from "./types";

export function resolver(
  engine: Setting["engines"][stringful],
  parsed: {
    key: stringful;
    terms: stringful[];
  },
) {
  const enum Special {
    Delimiter = " ",
    Separator = "+",
    Tag = "%s",
    WrapStart = 'data:text/html,<meta http-equiv=refresh content="0;url=',
    WrapEnd = '">',
  }

  const options = typeof engine === "object"
    && !Array.isArray(engine)
    ? engine
    : { url: engine },
  terms = parsed.terms;

  if (options.prepend !== undefined)
    void terms.unshift(
      ...options.prepend.split(Special.Delimiter) as stringful[],
    );

  function encoder(
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
        ?? Special.Separator,
      ) as stringful;

    if (options.url === undefined)
      return action === ""
        ? null
        : action;

    const replace = (url: string) => url.replace(
      Special.Tag,
      action,
    ) as stringful;

    function force(url: stringful) {
      return (
        Special.WrapStart
        + url
        + Special.WrapEnd
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
      action: encoder(terms, options),
    };

  const query = terms.length === 0
    ? null
    : terms.join(Special.Delimiter) as stringful;

  return {
    app: options.shortcut as Undefined<stringful> ?? parsed.key,
    action: options.encode === true
      ? encoder(terms, options)
      : query,
    notify: options.notify! || null as Null<true>,
    label: options.notify === true
      ? query
      : null,
    noSave: options.noSave ?? null,
  };
}

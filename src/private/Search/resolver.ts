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

  const wrapper = typeof engine === "object"
    && !Array.isArray(engine)
    ? engine
    : { url: engine },
  separator = wrapper.separator ?? Special.Separator,
  terms = parsed.terms;

  if (wrapper.prepend !== undefined)
    void terms.unshift(
      ...wrapper.prepend.split(Special.Delimiter) as stringful[],
    );

  function encoder(
    terms: readonly stringful[],
    separator: string,
    browser?: {
      url: Unflat;
      force?: boolean;
    },
  ) {
    const action = terms
      .map(encodeURIComponent)
      .join(separator);

    if (browser === undefined)
      return action === ""
        ? null
        : action as stringful;

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

    return Array.isArray(browser.url)
      ? browser.force === true
        ? browser
            .url
            .map(replace)
            .map(force)
        : browser
            .url
            .map(replace)
      : browser.force === true
        ? force(replace(browser.url))
        : replace(browser.url);
  }

  if ("url" in wrapper)
    return {
      action: encoder(
        terms,
        separator,
        wrapper,
      ),
    };

  const query = terms.length === 0
    ? null
    : terms.join(Special.Delimiter) as stringful;

  return {
    app: wrapper.shortcut as Undefined<stringful> ?? parsed.key,
    action: wrapper.encode === true
      ? encoder(terms, separator)
      : query,
    notify: wrapper.notify! || null as Null<true>,
    label: wrapper.notify === true
      ? query
      : null,
    noSave: wrapper.noSave ?? null,
  };
}

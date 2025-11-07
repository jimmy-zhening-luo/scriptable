import type { Setting } from "./types";

export function resolver(
  engine: Setting["engines"][stringful],
  parsed: {
    key: stringful;
    terms: stringful[];
  },
) {
  const wrapper = typeof engine === "object"
    && !Array.isArray(engine)
    ? engine
    : { url: engine },
  separator = wrapper.separator ?? "+",
  terms = parsed.terms;

  if (wrapper.prepend !== undefined)
    void terms.unshift(
      ...wrapper.prepend.split(" ") as stringful[],
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
      .map(term => encodeURIComponent(term))
      .join(separator);

    if (browser === undefined)
      return action === ""
        ? null
        : action as stringful;

    if (Array.isArray(browser.url)) {
      const queries = browser
        .url
        .map(url => url.replace("%s", action) as stringful);

      return browser.force === true
        ? queries.map(
            query => ('data:text/html,<meta http-equiv=refresh content="0;url=' + query + '">') as stringful,
          )
        : queries;
    }
    else {
      const query = browser.url.replace("%s", action) as stringful;

      return browser.force === true
        ? 'data:text/html,<meta http-equiv=refresh content="0;url=' + query + '">' as stringful
        : query;
    }
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
    : terms.join(" ") as stringful;

  return {
    app: wrapper.shortcut as Undefined<stringful> ?? parsed.key,
    action: wrapper.encode === true
      ? encoder(terms, separator)
      : query,
    notify: wrapper.notify! || null as Null<true>,
    label: query,
    noSave: wrapper.noSave,
  };
}

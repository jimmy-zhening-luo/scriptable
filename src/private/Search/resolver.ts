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
  { separator = "+" } = wrapper,
  terms = wrapper.prepend === undefined
    ? parsed.terms
    : wrapper
      .prepend
      .split(" ")
      .concat(parsed.terms) as stringful[];

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

    const queries = (
      typeof browser.url === "string"
        ? [browser.url]
        : browser.url
    )
      .map(url => url.replace("%s", action));

    return browser.force === true
      ? queries.map(
          url => `data:text/html,<meta http-equiv=refresh content="0;url=${url}">` as stringful,
        )
      : queries as stringful[];
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

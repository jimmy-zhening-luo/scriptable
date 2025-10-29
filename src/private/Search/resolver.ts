import type { SearchSetting } from ".";

export default function (
  engine: SearchSetting["engines"][stringful],
  parsed: {
    key: stringful;
    terms: stringful[];
  },
) {
  function encoder(
    terms: readonly stringful[],
    separator: string,
    browser?: {
      url: Unflat<string, true>;
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
    else {
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
  }

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

  if ("url" in wrapper)
    return {
      action: encoder(
        terms,
        separator,
        wrapper,
      ),
    };
  else {
    const query = terms.length === 0
      ? null
      : terms.join(" ") as stringful;

    return {
      app: wrapper.shortcut ?? parsed.key,
      action: wrapper.encode === true
        ? encoder(terms, separator)
        : query,
      notify: wrapper.notify! || null,
      label: query,
      noSave: wrapper.noSave,
    };
  }
}

import type { SearchSetting } from ".";

export function resolver(
  engine: SearchSetting["engines"][stringful],
  key: stringful,
  terms: readonly stringful[],
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

      if (!queries.every((url): url is stringful => url !== ""))
        throw URIError("Empty Search URL");

      return browser.force === true
        ? queries.map(
            url => `data:text/html,<meta http-equiv=refresh content="0;url=${url}">` as stringful,
          )
        : queries;
    }
  }

  const wrapper = typeof engine === "object"
    && !Array.isArray(engine)
    ? engine
    : { url: engine },
  { separator = "+" } = wrapper,
  termsFinal = wrapper.prepend === undefined
    ? terms
    : wrapper
        .prepend
        .split(" ")
        .filter((term): term is stringful => term !== "")
        .concat(terms);

  if ("url" in wrapper)
    return {
      action: encoder(
        termsFinal,
        separator,
        wrapper,
      ),
    };
  else {
    const { shortcut = key } = wrapper,
    query = termsFinal.length === 0
      ? null
      : termsFinal.join(" ") as stringful;

    return {
      app: shortcut,
      action: wrapper.encode === true
        ? encoder(termsFinal, separator)
        : query,
      notify: wrapper.notify! || null,
      label: query,
      noSave: wrapper.noSave,
    };
  }
}

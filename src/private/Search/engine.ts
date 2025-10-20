import type { SearchSetting } from ".";

export default function (
  key: stringful,
  terms: readonly stringful[],
  config: SearchSetting["engines"][typeof key],
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

  const engine = typeof config === "object"
    && !Array.isArray(config)
    ? config
    : { url: config },
  { separator = "+" } = engine,
  termsFinal = engine.prepend === undefined
    ? terms
    : engine
      .prepend
      .split(" ")
      .filter((term): term is stringful => term !== "")
      .concat(terms);

  if ("url" in engine)
    return {
      app: "browser",
      action: encoder(
        termsFinal,
        separator,
        engine,
      ),
    };
  else {
    const { shortcut = key } = engine,
    query = termsFinal.length === 0
      ? null
      : termsFinal.join(" ") as stringful;

    return {
      app: shortcut,
      action: engine.encode === true
        ? encoder(termsFinal, separator)
        : query,
      notify: engine.notify || null,
      label: query,
      noSave: engine.noSave,
    };
  }
}

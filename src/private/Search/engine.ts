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
      url: string[];
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
      const query = browser
        .url
        .map(u => u.replace("%s", action));

      if (!query.every((u): u is stringful => u !== ""))
        throw URIError("Empty Search URL");

      return browser.force === true
        ? query.map(
          u => `data:text/html,<meta http-equiv=refresh content="0;url=${u}">` as stringful,
        )
        : query;
    }
  }

  const engine = typeof config === "string"
    ? { url: [config] }
    : Array.isArray(config)
      ? { url: config }
      : config,
  { separator = "+" } = engine,
  termsFinal = engine.prepend === undefined
    ? terms
    : prepend
      .split(" ")
      .filter((term): term is stringful => term !== "")
      .join(terms);

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
    };
  }
}

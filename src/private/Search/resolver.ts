import type { Setting } from "./types";

export function resolver(
  engine: stringful,
  terms: stringful[],
  manifest: Setting["engines"][stringful],
) {
  const options = typeof manifest === "string"
    || Array.isArray(manifest)
    ? { url: manifest }
    : manifest;

  const enum TermSeparator {
    Word = " ",
    Url = "+",
  }

  if (options.prepend)
    void terms.unshift(
      ...options.prepend.split(TermSeparator.Word) as stringful[],
    );

  function encode(
    terms: readonly stringful[],
    options: {
      url?: Unflat;
      force?: boolean;
      separator?: string;
    },
  ) {
    const { separator = TermSeparator.Url } = options,
    action = terms
      .map(encodeURIComponent)
      .join(separator);

    if (!options.url)
      return action as stringful || null;

    const enum UrlEncode {
      QueryParam = "%s",
      SerializeStart = 'data:text/html,<meta http-equiv=refresh content="0;url=',
      SerializeEnd = '">',
    }

    const plug = (url: string) => url.replace(
      UrlEncode.QueryParam,
      action,
    ) as stringful,
    force = (url: stringful) => (
      UrlEncode.SerializeStart
      + url
      + UrlEncode.SerializeEnd
    ) as stringful;

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
      action: encode(terms, options),
    };

  const { shortcut = engine } = options,
  text = terms.join(
    TermSeparator.Word,
  ) as stringful
  || null,
  notify = options.notify || null;

  return {
    app: shortcut,
    action: options.encode
      ? encode(terms, options)
      : text,
    notify,
    label: notify && text,
  };
}

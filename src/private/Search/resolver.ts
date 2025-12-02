import type { Query } from "./types";

export function resolver(
  key: stringful,
  terms: stringful[],
  draft: NonNullable<Query["draft"]>,
  override?: stringful,
) {
  const manifest = typeof draft === "string"
    ? { url: draft }
    : draft,
  prepend = override || manifest.prepend;

  if (prepend)
    void terms.unshift(
      ...prepend.split(" ") as stringful[],
    );

  function encode(
    terms: readonly stringful[],
    manifest: {
      url?: Unflat;
      force?: boolean;
      separator?: string;
    },
  ) {
    const enum UrlEncode {
      Separator = "+",
      QueryParam = "%s",
      SerializeStart = 'data:text/html,<meta http-equiv=refresh content="0;url=',
      SerializeEnd = '">',
    }
    const { separator = UrlEncode.Separator } = manifest,
    action = terms
      .map(encodeURIComponent)
      .join(separator);

    if (!manifest.url)
      return action as stringful || null;

    const plug = (url: string) => url.replace(
      UrlEncode.QueryParam,
      action,
    ) as stringful,
    force = (url: stringful) => (
      UrlEncode.SerializeStart
      + url
      + UrlEncode.SerializeEnd
    ) as stringful;

    return Array.isArray(manifest.url)
      ? manifest.force
        ? manifest
            .url
            .map(plug)
            .map(force)
        : manifest
            .url
            .map(plug)
      : manifest.force
        ? force(plug(manifest.url))
        : plug(manifest.url);
  }

  if ("url" in manifest)
    return {
      action: encode(terms, manifest),
    };

  const { shortcut = key } = manifest,
  text = terms.join(" ") as stringful || null,
  notify = manifest.notify || null;

  return {
    app: shortcut,
    action: manifest.encode
      ? encode(terms, manifest)
      : text,
    notify,
    label: notify && text,
  };
}

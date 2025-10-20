export type { ISearchEngine } from "./entry";
export default function<
  Engine extends
  | "browser"
  | "shortcut",
>(
  type: Engine,
  key: stringful,
  terms: readonly stringful[],
  handler: Engine extends "browser"
    ? Unflat
    : string = "",
  notifyOrTag:
    | boolean
    | (Engine extends "browser" ? stringful : boolean) = false,
  prepend = "",
  separator = "+",
  forceOrEncode = false,
) {
  function encoder(
    terms: readonly stringful[],
    separator: string,
    browserOptions?: {
      urls: Null<ArrayN>;
      tag: Null<stringful>;
      force: boolean;
    },
  ) {
    const action = terms
      .map(term => encodeURIComponent(term))
      .join(separator);

    if (browserOptions === undefined)
      return action === ""
        ? null
        : action as stringful;
    else {
      const queryfulUrls = browserOptions
        .urls!
        .map(
          url => url.replace(
            browserOptions.tag!,
            action,
          ),
        )
        .map(
          url => browserOptions.force
            ? `data:text/html,<meta http-equiv=refresh content="0;url=${url}">`
            : url,
        );

      if (!queryfulUrls.every((url): url is stringful => url !== ""))
        throw URIError("Empty Search URL");

      return queryfulUrls;
    }
  }

  const {
    engine = null,
    urls = null,
    tag = null,
    notify = null,
    force = false,
    encode = false,
  } = type === "browser"
    ? {
        urls: typeof handler === "string"
          ? [handler]
          : handler as string[],
        tag: notifyOrTag as stringful,
        force: forceOrEncode,
      }
    : {
        engine: handler === ""
          ? key
          : handler as stringful,
        notify: (notifyOrTag as boolean)
          || null,
        encode: forceOrEncode,
      },
  finalTerms = prepend === ""
    ? terms
    : [
        ...prepend
          .split(" ")
          .filter((term): term is stringful => term !== ""),
        ...terms,
      ] as const,
  queryText = finalTerms.length === 0
    ? null
    : finalTerms.join(" ") as stringful;

  return {
    engine,
    action: type === "browser"
      ? encoder(
          finalTerms,
          separator,
          {
            urls,
            tag,
            force,
          },
        )
      : encode
        ? encoder(finalTerms, separator)
        : queryText,
    notify,
    label: queryText,
  };
}

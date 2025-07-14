export type { ISearchEngineEntry } from "./entry";
export default function<
  EngineType extends (
    | "browser"
    | "shortcut"
  ),
>(
  key: stringful,
  terms: readonly stringful[],
  type: EngineType,
  engineOrUrls: EngineType extends "browser"
    ? Unflat
    : string,
  notifyOrTag:
    | boolean
    | (EngineType extends "browser" ? stringful : boolean) = false,
  prepend = "",
  forceOrEncode = false,
  separator = "+",
) {
  function encoder(
    terms: readonly stringful[],
    separator: string,
    browserOptions?: {
      urls: readonly string[];
      tag: stringful;
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
        .urls
        .map(
          url => url.replace(
            browserOptions.tag,
            action,
          ),
        )
        .map(
          url => browserOptions.force
            ? `data:text/html,%3Cmeta%20http-equiv=%22refresh%22%20content=%220;url=${url}%22%3E`
            : url,
        );

      if (!queryfulUrls.every((url): url is stringful => url !== ""))
        throw new URIError("Empty Search URL");

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
        urls: typeof engineOrUrls === "string"
          ? [engineOrUrls]
          : engineOrUrls as string[],
        tag: notifyOrTag as stringful,
        force: forceOrEncode,
      }
    : {
        engine: engineOrUrls === ""
          ? key
          : engineOrUrls as stringful,
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
            urls: urls!,
            tag: tag!,
            force,
          },
        )
      : encode
        ? encoder(
            finalTerms,
            separator,
          )
        : queryText,
    notify,
    label: queryText,
  };
}

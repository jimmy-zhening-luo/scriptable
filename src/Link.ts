// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

namespace Link {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Link extends shortcut<
    Field<
      | "scheme"
      | "host"
      | "port"
      | "path"
      | "query"
      | "fragment"
    >
    ,
    string,
    LinkSetting
  > {
    protected runtime() {
      const {
        host: {
          keepWww,
          swapHost,
        },
        query: { keepQuery },
        fragment: { omitFragment },
      } = this
        .user;
      const {
        scheme,
        host,
        port,
        path,
        query,
        fragment,
      } = this
        .inputful;
      const lowerScheme = scheme
        .toLowerCase();
      const trimmedHost =
        host
          .startsWith(
            "www.",
          )
          && !keepWww
            .includes(
              host,
            )
          ? host
            .slice(
              4,
            )
          : host;
      const Scheme = [
        "http",
        "https",
      ]
        .includes(
          lowerScheme,
        )
        ? ""
        : lowerScheme;
      const Host = swapHost[
        trimmedHost
      ]
      ?? trimmedHost;
      const Port = port;
      const Query = keepQuery
        .includes(
          Host,
        )
        ? query
        : "";
      const Fragment = omitFragment
        .includes(
          Host,
        )
        ? ""
        : fragment;
      let Path: string = path;

      if (
        Host === "amazon.com"
      ) {
        if (
          Path
            .includes(
              "/dp/",
            )
        )
          Path = ""; // TMP
      }
      else if (
        Host === "linkedin.com"
      )
        if (
          Path
            .startsWith(
              "/mwlite/",
            )
        )
          Path = Path
            .slice(
              7,
            );

      return this
        .buildURL(
          Scheme,
          Host,
          Port,
          Path,
          Query,
          Fragment,
        );
    }

    private buildURL(
      scheme: string,
      host: string,
      port: string,
      path: string,
      query: string,
      fragment: string,
    ) {
      try {
        return [
          [
            [
              [
                [
                  ...scheme.length > 0
                    ? [scheme]
                    : [],
                  host,
                ]
                  .join(
                    "://",
                  ),
                ...port.length > 0
                  ? [port]
                  : [],
              ]
                .join(
                  ":",
                ),
              ...path !== "/"
                ? [path]
                : [],
            ]
              .join(
                "",
              ),
            ...query.length > 0
              ? [query]
              : [],
          ]
            .join(
              "?",
            ),
          ...fragment.length > 0
            ? [fragment]
            : [],
        ]
          .join(
            "#",
          );
      }
      catch (e) {
        throw new EvalError(
          `Link: buildURL`,
          { cause: e },
        );
      }
    }
  }
}

new Link.Link()
  .run();

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

namespace Link {
  const shortcut = importModule(`system/Shortcut`) as typeof Shortcut;

  export class Link extends shortcut<
    Field<
      | "_scheme"
      | "_host"
      | "_port"
      | "_path"
      | "_query"
      | "_fragment"
    >,
    string,
    LinkSetting
  > {
    protected runtime() {
      const {
        host: {
          www,
          swap,
        },
        query: {
          omit,
          include,
          exclude,
        },
        fragment: { trim },
      } = this.setting;
      const {
        _scheme,
        _host,
        _port,
        _path,
        _query,
        _fragment,
      } = this.inputful;
      const __host = _host.startsWith("www.") && !www.includes(_host)
        ? _host.slice(4)
        : _host;
      const host = swap[__host] ?? __host;
      const [
        inclusions,
        exclusions,
      ] = [
        include[host] ?? [],
        exclude[host] ?? [],
      ];
      const url = {
        scheme: [
          "http",
          "https",
        ].includes(_scheme.toLowerCase())
          ? ""
          : _scheme.toLowerCase(),
        host,
        port: _port,
        path: [
          "amazon.com",
          "dropbox.com",
          "linkedin.com",
          "reddit.com",
        ].includes(host)
          ? new (
            this.Processor(host)
          )(
            host,
            _path,
          ).processed
          : _path,
        query: omit.includes(host)
          ? ""
          : host in include
            ? inclusions.length < 1
              ? ""
              : _query
                .split("&")
                .filter(
                  param =>
                    inclusions.includes(
                      param
                        .split("=")
                        .shift() ?? "",
                    ),
                )
                .join("&")
            : host in exclude
              ? _query
                .split("&")
                .filter(
                  param =>
                    !exclusions.includes(
                      param
                        .split("=")
                        .shift() ?? "",
                    ),
                )
                .join("&")
              : _query,
        fragment: trim.includes(host)
          ? ""
          : _fragment,
      };

      return this.buildURL(url);
    }

    private buildURL(
      url: Field<
        | "scheme"
        | "host"
        | "port"
        | "path"
        | "query"
        | "fragment"
      >,
    ) {
      try {
        const {
          scheme,
          host,
          port,
          path,
          query,
          fragment,
        } = url;

        return [
          [
            [
              [
                [
                  ...scheme.length > 0
                    ? [scheme]
                    : [],
                  host,
                ].join("://"),
                ...port.length > 0
                  ? [port]
                  : [],
              ].join(":"),
              ...path !== "/"
                ? [path]
                : [],
            ].join(""),
            ...query.length > 0
              ? [query]
              : [],
          ].join("?"),
          ...fragment.length > 0
            ? [fragment]
            : [],
        ].join("#");
      }
      catch (e) {
        throw new EvalError(
          `Link: buildURL`,
          { cause: e },
        );
      }
    }

    private Processor<Host extends string>(host: Host): new (
      host: Host,
      path: string
    )=> LinkPathProcessor<Host> {
      try {
        return importModule(
          `apps/method/link/processors/${host}`,
        ) as new (
          host: Host,
          path: string
        )=> LinkPathProcessor<Host>;
      }
      catch (e) {
        throw new EvalError(
          `Link: import <P>Processor`,
          { cause: e },
        );
      }
    }
  }
}

new Link.Link()
  .run();

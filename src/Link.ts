// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./lib";
import url from "./lib/object/url";
import type { LinkSetting } from "./interface/link";

function process(host: ReturnType<typeof url>["host"], path: string) {
  const processors = {
    "amazon.com": path => (([, pid = null]) => pid === null ? path : `/dp/${(pid.split("/") as Arrayful)[0]}`)(path.split("/dp/")),
    "dropbox.com": path => !path.startsWith("/scl/fi/") ? path : (nodes => nodes.length < 4 ? path : nodes.slice(0, 4).join("/"))(path.split("/")),
    "linkedin.com": path => path.startsWith("/mwlite/") ? path.slice(7) : path,
    "reddit.com": path => (nodes => nodes.length < 6 || nodes[3] !== "comments" ? path : nodes.slice(0, nodes[5] === "comment" ? 7 : 5).join("/"))(path.split("/")),
  } satisfies Record<string, (path: string) => string> as Record<ReturnType<typeof url>["host"], (path: string) => string>;

  return processors[host]?.(path) ?? path;
}

class Link extends Shortcut<
  string,
  stringful,
  LinkSetting
> {
  protected override stringInput = true;

  protected runtime() {
    function compose({
      scheme, host, path, query, fragment,
    }: ReturnType<typeof url>) {
      return `${scheme}${scheme === "" ? "" : "://"}${host}${path === "/" ? "" : path}${query === "" ? "" : "?"}${query}${fragment === "" ? "" : "#"}${fragment}` as stringful;
    }

    function deindex(list: ListTable, host: string) {
      return list[host]?.map(i => i.toLowerCase()) ?? [];
    }

    const {
      input = "",
      setting: {
        hosts,
        queries,
        fragments,
      },
    } = this,
    {
      scheme,
      host: parsedHost,
      path,
      query,
      fragment,
    } = url(input, true),
    host = ((host: ReturnType<typeof url>["host"]) => (headless => hosts.swap[headless] ?? headless)(!host.startsWith("www.") || hosts.www.includes(host) ? host : host.slice(4) as typeof host))(parsedHost),
    includeQ = deindex(queries.include, host),
    excludeQ = deindex(queries.exclude, host);

    return compose({
      scheme,
      host,
      path: process(host, path),
      query: queries.omit.includes(host)
        ? ""
        : includeQ.length > 0
          ? query
            .split("&")
            .filter(p => includeQ.includes((p.split("=")[0] as string).toLowerCase()))
            .join("&")
          : excludeQ.length > 0
            ? query
              .split("&")
              .filter(p => !excludeQ.includes((p.split("=")[0] as string).toLowerCase()))
              .join("&")
            : query,
      fragment: fragments.trim.includes(host) ? "" : fragment,
    });
  }
}

new Link().run();

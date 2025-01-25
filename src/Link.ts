// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./lib";
import Url from "./lib/object/url";
import type { LinkSetting } from "./interface/link";

function process(host: Url["host"], path: string) {
  const processors = {
    "amazon.com": path => (([, pid = null]) => pid === null ? path : `/dp/${(pid.split("/") as Arrayful)[0]}`)(path.split("/dp/")),
    "dropbox.com": path => !path.startsWith("/scl/fi/") ? path : (nodes => nodes.length < 4 ? path : nodes.slice(0, 4).join("/"))(path.split("/")),
    "linkedin.com": path => path.startsWith("/mwlite/") ? path.slice(7) : path,
    "reddit.com": path => (nodes => nodes.length < 6 || nodes[3] !== "comments" ? path : nodes.slice(0, nodes[5] === "comment" ? 7 : 5).join("/"))(path.split("/")),
  } satisfies Record<string, (path: string) => string> as Record<Url["host"], (path: string) => string>;

  return processors[host]?.(path) ?? path;
}

class Link extends Shortcut<
  string,
  stringful,
  LinkSetting
> {
  protected override stringInput = true;

  protected runtime() {
    const {
      input = "",
      setting: { hosts, queries, fragments },
    } = this,
    {
      scheme,
      host: _host,
      path,
      query,
      fragment,
    } = new Url(input),
    host = ((host: Url["host"]) => (headless => hosts.swap[headless] ?? headless)(!host.startsWith("www.") || hosts.preserve.includes(host) ? host : host.slice(4) as typeof host))(_host),
    [
      include = null,
      exclude = null,
    ] = (["include", "exclude"] as const).map(group => queries[group][host]?.map(i => i.toLowerCase()));

    return (({
      scheme, host, path, query, fragment,
    }: Url) => `${scheme}${scheme === "" ? "" : "://"}${host}${path === "/" ? "" : path}${query === "" ? "" : "?"}${query}${fragment}` as stringful)({
      scheme,
      host,
      path: process(host, path),
      query: queries.remove.includes(host)
        ? ""
        : include !== null
          ? query
              .split("&")
              .map(term => term.split("=") as Arrayful)
              .filter(([key]) => include.includes(key.toLowerCase()))
              .map(tuple => tuple.join("="))
              .join("&")
          : exclude !== null
            ? query
                .split("&")
                .map(term => term.split("=") as Arrayful)
                .filter(([key]) => !exclude.includes(key.toLowerCase()))
                .map(tuple => tuple.join("="))
                .join("&")
            : query,
      fragment: fragments.trim.includes(host) ? "" : fragment,
    });
  }
}

new Link().run();

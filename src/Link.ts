// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./lib";
import url from "./lib/object/url";
import type { LinkSetting } from "./interface/link";

function process(host: string, path: string) {
  const processors = {
    "amazon.com": (path: string) => (([, pid = null]) => pid === null ? path : `/dp/${(pid.split("/") as Arrayful)[0]}`)(path.split("/dp/")),
    "dropbox.com": (path: string) => !path.startsWith("/scl/fi/") ? path : (nodes => nodes.length < 4 ? path : nodes.slice(0, 4).join("/"))(path.split("/")),
    "linkedin.com": (path: string) => path.startsWith("/mwlite/") ? path.slice(7) : path,
    "reddit.com": (path: string) => (nodes => nodes.length < 6 || nodes[3] !== "comments" ? path : nodes.slice(0, nodes[5] === "comment" ? 7 : 5).join("/"))(path.split("/")),
  } as const;

  return host in processors ? processors[host as keyof typeof processors](path) : path;
}

class Link extends Shortcut<
  string,
  string,
  LinkSetting
> {
  protected override stringInput = true;

  protected runtime() {
    function compose({
      scheme, host, path, query, fragment,
    }: Field<
      | "scheme"
      | "host"
      | "path"
      | "query"
      | "fragment"
    >) {
      return `${scheme}${scheme === "" ? "" : "://"}${host}${path === "/" ? "" : path}${query === "" ? "" : "?"}${query}${fragment === "" ? "" : "#"}${fragment}`;
    }

    function deindex(list: ListTable, host: string) {
      return list[host]?.map(i => i.toLowerCase()) ?? [];
    }

    const { setting, input = "" } = this,
    {
      scheme,
      host: parsedHost,
      path,
      query,
      fragment,
    } = url(input),
    host = ((host: string) => (headless => setting.host.swap[headless] ?? headless)(!host.startsWith("www.") || setting.host.www.includes(host) ? host : host.slice(4)))(parsedHost),
    includeQ = deindex(setting.query.include, host),
    excludeQ = deindex(setting.query.exclude, host);

    return compose({
      host,
      scheme: ["http", "https"].includes(scheme) ? "" : scheme,
      path: process(host, path),
      query: setting.query.omit.includes(host)
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
      fragment: setting.fragment.trim.includes(host) ? "" : fragment,
    });
  }
}

new Link().run();

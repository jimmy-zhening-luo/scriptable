// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./lib";
import Url from "./lib/objects/url";

function Processor(host: string, path: string) {
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
  protected runtime() {
    const deindex = (list: ListTable, host: string) => list[host]?.map(i => i.toLowerCase()) ?? [],
    compose = ({
      scheme, host, path, query, fragment,
    }: Field<
      | "scheme"
      | "host"
      | "path"
      | "query"
      | "fragment"
    >) => [[[[...scheme === "" ? [] : [scheme], host].join("://"), ...path === "/" ? [] : [path]].join(""), ...query === "" ? [] : [query]].join("?"), ...fragment === "" ? [] : [fragment]].join("#"),
    { inputString, setting } = this,
    url = Url(inputString),
    host = ((host: string) => (headless => setting.host.swap[headless] ?? headless)(!host.startsWith("www.") || setting.host.www.includes(host) ? host : host.slice(4)))(url.host),
    params = {
      include: deindex(setting.query.include, host),
      exclude: deindex(setting.query.exclude, host),
    };

    return compose({
      host,
      scheme: ["http", "https"].includes(url.scheme) ? "" : url.scheme,
      path: Processor(host, url.path),
      query: setting.query.omit.includes(host)
        ? ""
        : params.include.length > 0
          ? url.query
            .split("&")
            .filter(p => params.include.includes(p.toLowerCase().split("=")[0] as string))
            .join("&")
          : params.exclude.length > 0
            ? url.query
              .split("&")
              .filter(p => !params.exclude.includes(p.toLowerCase().split("=")[0] as string))
              .join("&")
            : url.query,
      fragment: setting.fragment.trim.includes(host) ? "" : url.fragment,
    });
  }
}

new Link().run();

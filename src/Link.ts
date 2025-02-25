// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./lib";
import Url from "./lib/object/url";
import type { LinkSetting } from "./interface/Link";

function process(host: Url["host"], path: string) {
  const processors = {
    "amazon.com": path => (([, pid = null]) => pid === null ? path : `/dp/${(pid.split("/") as Arrayful)[0]}`)(path.split("/dp/")),
    "dhl.com": path.endsWith("/tracking.html") ? "/tracking.html" : path.startsWith("/orders/") && path.includes("/details/") ? `/tracking.html?tracking-id=${path.split("/")[4] ?? ""}` : path,
    "dropbox.com": path => !path.startsWith("/scl/fi/") ? path : (nodes => nodes.length < 4 ? path : nodes.slice(0, 4).join("/"))(path.split("/")),
    "linkedin.com": path => path.startsWith("/mwlite/") ? path.slice(7) : path,
    "reddit.com": path => (nodes => nodes.length < 6 || nodes[3] !== "comments" ? path : nodes.slice(0, nodes[5] === "comment" ? 7 : 5).join("/"))(path.split("/")),
    "tools.usps.com": path => path.startsWith("/go/Track") ? "/go/TrackConfirmAction" : path,
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
    url = new Url(input),
    host = ((host: Url["host"]) => (headless => hosts.canonical[headless] ?? headless)(!host.startsWith("www.") || hosts.www.includes(host) ? host : host.slice(4) as typeof host))(url.host),
    [
      include = null,
      exclude = null,
    ] = (["include", "exclude"] as const).map(group => queries[group][host]),
    substitute = queries.substitute[host] ?? null;

    if (queries.remove.includes(host))
      url.deleteQuery();
    else if (include !== null)
      url.keepParams(...include);
    else if (exclude !== null)
      url.deleteParams(...exclude);

    if (substitute !== null)
      for (const [find, replace] of Object.entries(substitute))
        url.replaceParam(find, replace);

    const {
      scheme, path, query, fragment,
    } = url;

    return ((
      scheme: Url["scheme"],
      host: Url["host"],
      path: string,
      query: string,
      fragment: string,
    ) => `${scheme}://${host}${path}${query === "" ? "" : "?"}${query}${fragment === "" ? "" : "#"}${fragment}` as stringful)(
      scheme,
      host,
      process(host, path),
      query,
      fragments.shave.includes(host) ? "" : fragment,
    );
  }
}

new Link().run();

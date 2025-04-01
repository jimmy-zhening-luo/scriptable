// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./app";
import Url from "./app/lib/url";
import process from "./helper/link";
import type { LinkSetting } from "./interface/Link";

class Link extends Shortcut<
  string,
  stringful,
  LinkSetting
> {
  protected override stringInput = true;

  protected runtime() {
    const {
      input = "",
      setting: {
        hosts,
        queries,
        fragments,
      },
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

    if (fragments.shave.includes(host))
      url.deleteFragment();

    const {
      scheme,
      path,
      query,
      fragment,
    } = url;

    return ((
      scheme: Url["scheme"],
      host: Url["host"],
      path: string,
      query: string,
      fragment: string,
    ) => `${scheme}://${host}${path}${query}${fragment}` as stringful)(
      scheme,
      host,
      process(host, path),
      query,
      fragment,
    );
  }
}

new Link().run();

// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./app";
import Url from "./app/lib/url";
import process from "./methods/link";
import type { LinkSetting } from "./types/Link";

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
        allow,
        block,
        replace,
      },
    } = this,
    url = new Url(input),
    host = ((host: Url["host"]) => (headless => replace.host[headless] ?? headless)(!host.startsWith("www.") || allow.host.www.includes(host) ? host : host.slice(4) as typeof host))(url.host),
    include = block.query.except[host] ?? null,
    exclude = allow.query.except[host] ?? null,
    substitutes = replace.query[host] ?? null;

    if (block.query.all.includes(host))
      url.deleteQuery();
    else if (include !== null)
      url.keepParams(...include);
    else if (exclude !== null)
      url.deleteParams(...exclude);

    if (substitutes !== null)
      for (const [find, replace] of Object.entries(substitutes))
        url.replaceParam(find, replace);

    if (block.fragment.includes(host))
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

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

import Shortcut from "./lib";
import processor from "./apps/method/link";

class Link extends Shortcut<
  string,
  string,
  LinkSetting
> {
  private static compose({
    scheme,
    host,
    path,
    query,
    fragment,
  }: Field<
    | "scheme"
    | "host"
    | "path"
    | "query"
    | "fragment"
  >) {
    return [[[[...scheme.length > 0 ? [scheme] : [], host].join("://"), ...path !== "/" ? [path] : []].join(""), ...query.length > 0 ? [query] : []].join("?"), ...fragment.length > 0 ? [fragment] : []].join("#");
  }

  protected runtime() {
    const { inputString, setting } = this,
    url = Link.url(inputString),
    resolve = (host: string, setting: typeof this.setting.host) => {
      const pruned = host.slice(host.startsWith("www.") && !setting.www.includes(host) ? 4 : 0);

      return setting.swap[pruned] ?? pruned;
    },
    deindex = (list: ListTable, host: string) => list[host]?.map(i => i.toLowerCase()) ?? [],
    host = resolve(url.host, setting.host),
    params = {
      include: deindex(setting.query.include, host),
      exclude: deindex(setting.query.exclude, host),
    };

    return Link.compose({
      host,
      scheme: ["http", "https"].includes(url.scheme) ? "" : url.scheme,
      path: processor(host, url.path),
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

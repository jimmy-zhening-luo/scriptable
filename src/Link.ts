// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

import Shortcut from "./lib";
import type LinkPathProcessor from "./apps/method/link/processor";

class Link extends Shortcut<
  string,
  string,
  LinkSetting
> {
  private static Processor<H extends string>(host: H): new (host: H, path: string) => LinkPathProcessor<H> {
    return importModule<new (host: H, path: string) => LinkPathProcessor<H>>(`./apps/method/link/${host}`);
  }

  private static buildURL(url: Field<
    | "scheme"
    | "host"
    | "path"
    | "query"
    | "fragment"
  >) {
    const {
      scheme,
      host,
      path,
      query,
      fragment,
    } = url;

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
    },
    PROCESSORS = [
      "amazon.com",
      "dropbox.com",
      "linkedin.com",
      "reddit.com",
    ];

    return Link.buildURL({
      host,
      scheme: ["http", "https"].includes(url.scheme) ? "" : url.scheme,
      path: PROCESSORS.includes(host) ? new (Link.Processor(host))(host, url.path).processed : url.path,
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

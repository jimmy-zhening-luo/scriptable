// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

import type { Shortcut } from "./system/Shortcut";
import type { LinkPathProcessor } from "./apps/method/link/processors/processor";

class Link extends importModule<typeof Shortcut<
  string,
  string,
  LinkSetting
>>("./system/Shortcut") {
  protected runtime() {
    const { inputString, setting } = this,
    url = this.url(inputString),
    host = this.resolve(url.host, setting.host),
    params = {
      include: this.deindex(setting.query.include, host),
      exclude: this.deindex(setting.query.exclude, host),
    },
    PROCESSORS = [
      "amazon.com",
      "dropbox.com",
      "linkedin.com",
      "reddit.com",
    ];

    return this.buildURL({
      host,
      scheme: ["http", "https"].includes(url.scheme) ? "" : url.scheme,
      path: PROCESSORS.includes(host) ? new (this.Processor(host))(host, url.path).processed : url.path,
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

  private resolve(host: string, setting: Link["setting"]["host"]) {
    const pruned = host.slice(host.startsWith("www.") && !setting.www.includes(host) ? 4 : 0);

    return setting.swap[pruned] ?? pruned;
  }

  private deindex(list: ListTable, host: string) {
    return list[host]?.map(i => i.toLowerCase()) ?? [];
  }

  private buildURL(url: ReturnType<Link["url"]>) {
    const {
      scheme,
      host,
      path,
      query,
      fragment,
    } = url;

    return [[[[...scheme.length > 0 ? [scheme] : [], host].join("://"), ...path !== "/" ? [path] : []].join(""), ...query.length > 0 ? [query] : []].join("?"), ...fragment.length > 0 ? [fragment] : []].join("#");
  }

  private Processor<H extends string>(host: H): new (host: H, path: string) => LinkPathProcessor<H> {
    return importModule<new (host: H, path: string) => LinkPathProcessor<H>>(`./apps/method/link/processors/${host}`);
  }
}

new Link().run();

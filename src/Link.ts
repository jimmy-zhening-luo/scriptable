// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

import type { Shortcut } from "./system/Shortcut";
import type { LinkPathProcessor } from "./apps/method/link/processors/processor";

namespace Link {
  const shortcut = importModule<typeof Shortcut>("./system/Shortcut");

  export class Link extends shortcut<
    string,
    string,
    LinkSetting
  > {
    protected runtime() {
      const PROCESSORS = [
        "amazon.com",
        "dropbox.com",
        "linkedin.com",
        "reddit.com",
      ],
      {
        scheme,
        host,
        path,
        query,
        fragment,
      } = this.url(this.inputString),
      {
        host: { www, swap },
        query: { omit, include, exclude },
        fragment: { trim },
      } = this.setting,
      unhost = host.startsWith("www.") && !www.includes(host)
        ? host.slice(4)
        : host,
      HOST = swap[unhost] ?? unhost,
      inclusions = this.deindex(include, HOST),
      exclusions = this.deindex(exclude, HOST);
      
      return this.buildURL({
        scheme: ["http", "https"].includes(scheme) ? "" : scheme,
        host: HOST,
        path: PROCESSORS.includes(HOST) ? new (this.Processor(HOST))(HOST, path).processed : path,
        query: omit.includes(HOST)
          ? ""
          : HOST in include
            ? inclusions.length < 1
              ? ""
              : query
                .split("&")
                .filter(param => inclusions.includes(param.toLowerCase().split("=")[0] as string))
                .join("&")
            : HOST in exclude
              ? query
                .split("&")
                .filter(param => !exclusions.includes(param.toLowerCase().split("=")[0] as string))
                .join("&")
              : query,
        fragment: trim.includes(HOST) ? "" : fragment,
      });
    }

    private deindex(list: ListTable, host: string) {
      return list[host]?.map(i => i.toLowerCase()) ?? [];
    }

    private buildURL(
      url: Field<
        | "scheme"
        | "host"
        | "path"
        | "query"
        | "fragment"
      >,
    ) {
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
}

(new Link.Link).run();

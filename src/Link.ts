// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

import type { LinkPathProcessor } from "./apps/method/link/processors/processor";

namespace Link {
  const shortcut = importModule("./system/Shortcut");

  export class Link extends shortcut<
    string,
    Field<"link", "postprocessor">,
    LinkSetting
  > {
    protected runtime() {
      const processors = [
        "amazon.com",
        "dropbox.com",
        "linkedin.com",
        "reddit.com",
      ],
      { host: { www, swap }, query: { omit, include, exclude }, fragment: { trim } } = this.setting,
      {
        scheme,
        host,
        path,
        query,
        fragment,
      } = this.url(this.inputString),
      ___host = host.startsWith("www.") && !www.includes(host) ? host.slice(4) : host,
      HOST = swap[___host] ?? ___host,
      [inclusions, exclusions] = [include[HOST]?.map(p => p.toLowerCase()) ?? [], exclude[HOST]?.map(p => p.toLowerCase()) ?? []],
      processor = processors.includes(HOST) ? new (this.Processor(HOST))(HOST, path) : null,
      postprocessor = processor?.postprocessor ?? null,
      url = {
        scheme: ["http", "https"].includes(scheme.toLowerCase()) ? "" : scheme.toLowerCase(),
        host: HOST,
        path: processor === null ? path : processor.processed,
        query: omit.includes(HOST)
          ? ""
          : HOST in include
            ? inclusions.length < 1
              ? ""
              : query
                .split("&")
                .filter(param => inclusions.includes(param.toLowerCase().split("=")[0] ?? ""))
                .join("&")
            : HOST in exclude
              ? query
                .split("&")
                .filter(param => !exclusions.includes(param.toLowerCase().split("=")[0] ?? ""))
                .join("&")
              : query,
        fragment: trim.includes(HOST) ? "" : fragment,
      };

      return { link: this.buildURL(url), ...postprocessor === null ? {} : { postprocessor } };
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

    private Processor<H extends string>(host: H): new (host: H, path: string)=> LinkPathProcessor<H> {
      return importModule<new (host: H, path: string)=> LinkPathProcessor<H>>(`apps/method/link/processors/${host}`);
    }
  }
}

(new Link.Link).run();

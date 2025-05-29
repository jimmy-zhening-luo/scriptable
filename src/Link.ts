// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./app";
import Url from "./lib/url";
import process from "./private/method/link";
import type { LinkSetting } from "./private/interface/Link";

class Link extends Shortcut<
  string,
  string,
  LinkSetting<Url["host"]>
> {
  protected runtime() {
    const url = new Url(this.input),
    host = (
      (host: Url["host"]) => (
        headless => this.setting
          .replace
          .host[headless]
          ?? headless
      )(
        host.startsWith("www.")
        && !this.setting
          .allow
          .host
          .www
          .includes(host)
          ? host.slice(4) as typeof host
          : host,
      )
    )(
      url.host,
    );

    if (
      this.setting
        .block
        .fragment
        .includes(host)
    )
      url.dropFragment();

    if (
      this.setting
        .block
        .query
        .all
        .includes(host)
    )
      url.dropQuery();
    else if (
      host in this.setting
        .block
        .query
        .except
    )
      url.deleteParamsExcept(
        ...this.setting
          .block
          .query
          .except[host]!,
      );
    else if (
      host in this.setting
        .allow
        .query
        .except
    )
      url.deleteParams(
        ...this.setting
          .allow
          .query
          .except[host]!,
      );

    if (
      host in this.setting
        .replace
        .query
    )
      for (
        const [find, replace] of Object.entries(
          this.setting
            .replace
            .query[host]!,
        )
      )
        url.replaceParam(find, replace);

    return [
      url.schemeHost,
      process(host, url.path),
      url.query,
      url.fragment,
    ].join("");
  }
}

new Link().run();

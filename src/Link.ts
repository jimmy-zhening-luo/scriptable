// icon-color: light-gray; icon-glyph: link;
import Shortcut from "./core";
import Url from "./lib/url";
import process from "./apps/Link";
import type { LinkSetting } from "./apps/Link";

class Link extends Shortcut<
  string,
  string,
  LinkSetting
> {
  protected runtime() {
    const url = new Url(this.input),
    host = url.host in this.setting
      .replace
      .host
      ? this.setting
        .replace
        .host[url.host]!
      : url.host;

    if (
      host in this.setting
        .block
        .fragment
    )
      url.dropFragment();

    if (
      host in this.setting
        .block
        .query
    )
      url.deleteParamsExcept(
        ...this.setting
          .block
          .query[host]!,
      );
    else if (
      host in this.setting
        .allow
        .query
    )
      url.deleteParams(
        ...this.setting
          .allow
          .query[host]!,
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
        url.replaceParamName(find, replace);

    return [
      url.schemeHost,
      process(host, url.path),
      url.query,
      url.fragment,
    ].join("");
  }
}

new Link().run();

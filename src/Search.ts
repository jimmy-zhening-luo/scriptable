// icon-color: blue; icon-glyph: search;
import Shortcut from "./app";
import Query from "./private/method/search/query";
import Engine from "./private/method/search/engine";
import type { SearchOutput, SearchSetting } from "./private/interface/Search";

class Search extends Shortcut<
  string,
  SearchOutput,
  SearchSetting
> {
  protected override stringInput = true;

  protected runtime() {
    const {
      input: query = "",
      setting: {
        alias,
        engines,
        fallbacks,
        reserved: {
          operators,
          selectors,
          tag,
        },
      },
    } = this,
    {
      key,
      terms,
      question,
      recomposed,
    } = Query(
      query === "" ? this.read() : query,
      alias,
      new Set<string>(Object.keys(engines)),
      this.stringfuls(fallbacks),
      this.stringful(operators),
      this.chars(selectors),
    ),
    entry = engines[key] as typeof engines[string],
    engine = Array.isArray(entry) || typeof entry === "string"
      ? new Engine(
        "browser",
        entry,
        this.stringful(tag),
      )
      : "url" in entry
        ? new Engine(
          "browser",
          entry.url,
          this.stringful(tag),
          entry.separator,
          entry.encodeComponent,
          entry.force,
        )
        : "api" in entry
          ? new Engine(
            "api",
            entry.api,
            this.stringful(tag),
            entry.separator,
            entry.encodeComponent,
          )
          : new Engine(
            "shortcut",
            (entry.shortcut as Undef<string>) ?? "",
            entry.notify,
          );

    this.write(recomposed);

    return engine.resolve(
      key,
      terms,
      question,
    );
  }
}

new Search().run();

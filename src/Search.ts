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
      input: _input = "",
      setting: {
        reserved: {
          tags: { query: tag },
          selectors,
          operators,
        },
        fallbacks,
        alias,
        engines,
      },
    } = this,
    input = _input === "" ? this.read() : _input,
    {
      key,
      terms,
      question,
      recomposed,
    } = Query(
      input,
      this.chars(selectors),
      this.stringful(operators),
      this.stringfuls(fallbacks),
      alias,
      new Set<string>(Object.keys(engines)),
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
          : "shortcut" in entry
            ? new Engine("shortcut", entry.shortcut, entry.notify)
            : new Engine("shortcut", "");

    this.write(recomposed);

    return engine.resolve(
      key,
      terms,
      question,
    );
  }
}

new Search().run();

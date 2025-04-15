// icon-color: blue; icon-glyph: search;
import Shortcut from "./app";
import Query from "./methods/search/query";
import Engine from "./methods/search/engine";
import type { SearchOutput, SearchSetting } from "./types/Search";

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
        tags: { query: tag },
        engines,
        alias,
        reserved: {
          selectors,
          operators,
        },
        defaults: {
          math,
          chat,
          translate,
          fallback,
        },
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
      engines,
      alias,
      this.stringfuls(fallback),
      this.chars(selectors),
      ...this.stringfuls([
        operators,
        math,
        translate,
        chat,
      ] as const),
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
          : "find" in entry
            ? new Engine("find", entry.find)
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

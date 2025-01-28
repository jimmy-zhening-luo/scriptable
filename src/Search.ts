// icon-color: blue; icon-glyph: search;
import Shortcut from "./lib";
import Query from "./helper/search/query";
import Engine from "./helper/search/engine";
import type { SearchOutput, SearchSetting } from "./interface/search";

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
        tags: { query: _tag },
        engines,
        alias,
        reserved: {
          selector,
          operators,
        },
        defaults: {
          math,
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
      ...Search.stringfuls([
        selector,
        operators,
        math,
        translate,
      ] as const),
      Search.stringfuls(fallback),
    ),
    entry = engines[key] as typeof engines[string],
    engine = Array.isArray(entry) || typeof entry === "string"
      ? new Engine(
        "browser",
        entry,
        Search.stringful(_tag),
      )
      : "url" in entry
        ? new Engine(
          "browser",
          entry.url,
          Search.stringful(_tag),
          entry.separator,
          entry.encodeComponent,
          entry.force,
        )
        : "api" in entry
          ? new Engine(
            "api",
            entry.api,
            Search.stringful(_tag),
            entry.separator,
            entry.encodeComponent,
          )
          : "shortcut" in entry
            ? new Engine("shortcut", entry.shortcut, entry.notify)
            : new Engine("find", entry.find);

    this.write(recomposed);

    return engine.resolve(
      key,
      terms,
      question,
    );
  }
}

new Search().run();

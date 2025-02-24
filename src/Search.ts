// icon-color: blue; icon-glyph: search;
import Shortcut from "./lib";
import Query from "./helper/search/query";
import Engine from "./helper/search/engine";
import type { SearchOutput, SearchSetting } from "./interface/Search";

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
          selector,
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
      Search.char(selector),
      ...Search.stringfuls([
        operators,
        math,
        chat,
        translate,
      ] as const),
      Search.stringfuls(fallback),
    ),
    entry = engines[key] as typeof engines[string],
    engine = Array.isArray(entry) || typeof entry === "string"
      ? new Engine(
        "browser",
        entry,
        Search.stringful(tag),
      )
      : "url" in entry
        ? new Engine(
          "browser",
          entry.url,
          Search.stringful(tag),
          entry.separator,
          entry.encodeComponent,
          entry.force,
        )
        : "api" in entry
          ? new Engine(
            "api",
            entry.api,
            Search.stringful(tag),
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

// icon-color: blue; icon-glyph: search;
import Shortcut from "./lib";
import Query from "./helper/search/query";
import Engine from "./helper/search/engine";
import type { SearchOutput } from "./interface/output/search";
import type { SearchSetting } from "./interface/setting/search";

class Search extends Shortcut<
  string,
  SearchOutput,
  SearchSetting
> {
  protected override stringInput = true;

  protected runtime() {
    const {
      tags: { query: tag },
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
    } = this.setting,
    { input = "" } = this,
    string = input === "" ? this.read() : input,
    {
      key,
      terms,
      question,
      recomposed,
    } = Query(
      string,
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
        tag as stringful,
      )
      : "url" in entry
        ? new Engine(
          "browser",
          entry.url,
          tag as stringful,
          entry.separator,
          entry.encodeComponent,
          entry.force,
        )
        : "api" in entry
          ? new Engine(
            "api",
            entry.api,
            tag as stringful,
            entry.separator,
            entry.encodeComponent,
          )
          : "shortcut" in entry
            ? new Engine("shortcut", entry.shortcut, entry.output)
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

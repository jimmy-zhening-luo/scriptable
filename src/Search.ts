// icon-color: blue; icon-glyph: search;
import Shortcut from "./lib";
import Query from "./helper/search/query";
import Engine from "./helper/search/engine";
import WebEngine from "./helper/search/engine/web";

class Search extends Shortcut<
  string,
  SearchOutput,
  SearchSetting
> {
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
    query = new Query(
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
    entry = query.engine,
    engine = Array.isArray(entry) || typeof entry === "string"
      ? new WebEngine(
        "browser",
        entry,
        tag as stringful,
      )
      : "url" in entry
        ? new WebEngine(
          "browser",
          entry.url,
          tag as stringful,
          entry.separator,
          entry.encodeComponent,
          entry.force,
          entry.inprivate,
        )
        : "api" in entry
          ? new WebEngine(
            "api",
            entry.api,
            tag as stringful,
            entry.separator,
            entry.encodeComponent,
          )
          : "shortcut" in entry
            ? new Engine("shortcut", entry.shortcut, entry.output)
            : new Engine("find", entry.find);

    this.write(query.string);

    return engine.resolve(query);
  }
}

new Search().run();

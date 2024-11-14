// icon-color: blue; icon-glyph: search;
import Shortcut from "./lib";
import Query from "./helper/search/query";
import Engine from "./helper/search/engine";
import WebEngine from "./helper/search/engine/web";

class Search extends Shortcut<
  Field<
    | "input"
    | "latlong"
  >,
  SearchOutput,
  SearchSetting
> {
  protected runtime() {
    const {
      tags: {
        query: tag,
        location: locationTag,
      },
      engines,
      alias,
      reserved: {
        replacer,
        selector,
        operators,
      },
      defaults: {
        math,
        translate,
        fallback,
      },
    } = this.setting,
    { input, latlong } = this.inputful,
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
        latlong,
        Search.stringfuls([tag, locationTag] as const),
      )
      : "url" in entry
        ? new WebEngine(
          "browser",
          entry.url,
          latlong,
          Search.stringfuls([tag, locationTag] as const),
          entry.separator,
          entry.encodeComponent,
          entry.force,
          entry.inprivate,
        )
        : "api" in entry
          ? new WebEngine(
            "api",
            entry.api,
            latlong,
            Search.stringfuls([tag, locationTag] as const),
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

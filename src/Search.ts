// icon-color: blue; icon-glyph: search;
import Shortcut from "./lib";
import Query from "./helper/search/query";
import BrowserEngine from "./helper/search/engines/browser";
import FindEngine from "./helper/search/engines/find";
import ShortcutEngine from "./helper/search/engines/shortcut";

class Search extends Shortcut<
  Field<
    | "input"
    | "clipboard"
    | "lat"
    | "long"
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
    {
      input,
      clipboard,
      lat,
      long,
    } = this.inputful,
    string = input.length > 0
      ? input.replaceAll(
        `${replacer}${selector}`,
        clipboard,
      )
      : this.read(),
    latlong = Search.stringfuls([lat, long] as const)
      .map(coordinate => Math.round(Number(coordinate) * 1000000) / 1000000)
      .join(",") as stringful,
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
      ? new BrowserEngine(
        entry,
        latlong,
        Search.stringfuls([tag, locationTag] as const),
      )
      : "url" in entry
        ? new BrowserEngine(
          entry.url,
          latlong,
          Search.stringfuls([tag, locationTag] as const),
          entry.separator,
          entry.encodeComponent,
          entry.api,
          entry.force,
          entry.inprivate,
        )
        : "shortcut" in entry
          ? new ShortcutEngine(entry.shortcut, entry.output)
          : new FindEngine(entry.find);

    this.write(String(query));

    return engine.resolve(query);
  }
}

new Search().run();

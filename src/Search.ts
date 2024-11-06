// icon-color: blue; icon-glyph: search;
import Shortcut from "./lib";
import Query from "./helper/search/query";
import BrowserEngine from "./helper/search/engines/browser";
import FindEngine from "./helper/search/engines/find";
import ShortcutEngine from "./helper/search/engines/shortcut";

class Search extends Shortcut<
  Field<"query" | "clipboard">,
  SearchOutput,
  SearchSetting
> {
  protected runtime() {
    const { inputful, setting } = this,
    input = inputful.query.length > 0 ? inputful.query : this.read(),
    {
      tag,
      engines,
      alias,
      reserved: { selector, operators },
      defaults: {
        math,
        translate,
        fallback,
      },
    } = setting,
    query = new Query(
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
    entry = query.engine,
    engine = Array.isArray(entry) || typeof entry === "string"
      ? new BrowserEngine(entry, Search.stringful(tag))
      : "url" in entry
        ? new BrowserEngine(
          entry.url,
          Search.stringful(tag),
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

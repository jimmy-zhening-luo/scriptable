// icon-color: blue; icon-glyph: search;
import Shortcut from "./core";
import SearchQuery from "./apps/Search";
import SearchEngine from "./apps/Search/engine";
import type {
  SearchOutput,
  SearchSetting,
} from "./apps/Search";

class Search extends Shortcut<
  string,
  SearchOutput,
  SearchSetting
> {
  protected runtime() {
    const { input = "" } = this,
    {
      key,
      terms,
    } = SearchQuery(
      input === ""
        ? this.read()
        : input,
      new Set(
        Object.keys(
          this
            .setting
            .engines,
        ),
      ),
      this
        .setting
        .alias,
      this.stringfuls(
        this
          .setting
          .fallbacks,
      ),
      this.stringful(
        this
          .setting
          .reserved
          .operators,
      ),
      new Set(
        this.chars(
          this
            .setting
            .reserved
            .selectors,
        ),
      ),
    ),
    entry = this
      .setting
      .engines[key]!,
    engine = Array.isArray(entry)
      || typeof entry === "string"
      ? new SearchEngine(
        "browser",
        entry,
        this.stringful(
          this
            .setting
            .reserved
            .tag,
        ),
      )
      : "url" in entry
        ? new SearchEngine(
          "browser",
          entry.url,
          this.stringful(
            this
              .setting
              .reserved
              .tag,
          ),
          entry.prepend,
          entry.force,
          entry.separator,
        )
        : new SearchEngine(
          "shortcut",
          (entry.shortcut as Undef<string>)
          ?? "",
          entry.notify,
          entry.prepend,
          entry.encode,
        );

    this.write(
      [key, ...terms].join(" "),
    );

    return engine.resolve(
      key,
      terms,
    );
  }
}

new Search().run();

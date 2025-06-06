// icon-color: blue; icon-glyph: search;
import Shortcut from "./app";
import SearchQuery from "./private/Search";
import SearchEngine from "./private/Search/engine";
import type {
  SearchOutput,
  SearchSetting,
} from "./private/Search";

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
      query,
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
          entry.force,
          entry.separator,
        )
        : new SearchEngine(
          "shortcut",
          (entry.shortcut as Undef<string>)
          ?? "",
          entry.notify,
          entry.encode,
        );

    this.write(
      query === null
        ? key
        : [key, query].join(" "),
    );

    return engine.resolve(
      key,
      terms,
      query,
    );
  }
}

new Search().run();

// icon-color: blue; icon-glyph: search;
import Shortcut from "./app";
import Query from "./private/Search/query";
import Engine from "./private/Search/engine";
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
    } = Query(
      input === ""
        ? this.read()
        : input,
      this
        .setting
        .alias,
      new Set(
        Object.keys(
          this
            .setting
            .engines,
        ),
      ),
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
      ? new Engine(
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
        ? new Engine(
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
        : new Engine(
          "shortcut",
          (entry.shortcut as Undef<string>)
          ?? "",
          entry.notify,
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

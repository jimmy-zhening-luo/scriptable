// icon-color: blue; icon-glyph: search;
import Shortcut from "./core";
import parse from "./apps/Search";
import engine from "./apps/Search/engine";
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
    } = parse(
      input === ""
        ? this.get("history")
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
    entryHasOption = typeof entry === "object"
      && !Array.isArray(entry);

    if (
      !entryHasOption
      || !entry.noSave
    )
      this.set(
        "history",
        [key, ...terms]
          .join(" "),
      );

    return !entryHasOption
      ? engine(
          key,
          terms,
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
        ? engine(
            key,
            terms,
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
        : engine(
            key,
            terms,
            "shortcut",
            (entry.shortcut as Undef<string>)
            ?? "",
            entry.notify,
            entry.prepend,
            entry.encode,
            entry.separator,
          );
  }
}

new Search().run();

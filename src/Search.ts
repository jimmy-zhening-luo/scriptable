// icon-color: blue; icon-glyph: search;
import Shortcut from "./core";
import parse from "./apps/Search";
import resolve from "./apps/Search/resolve";
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
        ? this.readString()
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
    objectEntry = typeof entry !== "string"
      && !Array.isArray(entry);

    if (
      !objectEntry
      || !entry.noSave
    )
      this.write(
        [key, ...terms]
          .join(" "),
      );

    return !objectEntry
      ? resolve(
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
        ? resolve(
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
        : resolve(
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

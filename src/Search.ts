// icon-color: blue; icon-glyph: search;
import Shortcut from "./app";
import parse from "./private/Search";
import engine from "./private/Search/engine";
import type {
  SearchOutput,
  SearchSetting,
} from "./private/Search";

void new class Search extends Shortcut<
  string,
  SearchOutput,
  SearchSetting
> {
  protected runtime() {
    function history(history: string) {
      return history === ""
        ? {
            key: "null" as stringful,
            terms: [],
            parsed: false,
          }
        : JSON.parse(history) as ReturnType<typeof parse>;
    }

    const {
      setting: {
        alias,
        engines,
        reserved: { selectors },
      },
      input = "",
    } = this,
    {
      key,
      terms,
      parsed = false,
    } = input === ""
      ? history(this.get("history"))
      : parse(
          input,
          new Set(Object.keys(engines)),
          alias,
          new Set(selectors satisfies string as unknown as char[]),
        ),
    { [key]: entry = engines["null"]! } = engines,
    entryOption = typeof entry === "object"
      && !Array.isArray(entry);

    if (parsed && (!entryOption || !entry.noSave))
      this.set(
        "history",
        {
          key,
          terms,
        },
      );

    const TAG = "%s" as stringful;

    return !entryOption
      ? engine(
          "browser",
          key,
          terms,
          entry,
          TAG,
        )
      : "url" in entry
        ? engine(
            "browser",
            key,
            terms,
            entry.url,
            TAG,
            entry.prepend,
            entry.force,
            entry.separator,
          )
        : engine(
            "shortcut",
            key,
            terms,
            (entry.shortcut as Undefined<string>) ?? "",
            entry.notify,
            entry.prepend,
            entry.encode,
            entry.separator,
          );
  }
}().run();

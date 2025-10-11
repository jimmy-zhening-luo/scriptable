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
    function history(history: Undef<string>) {
      return history === undefined
        ? {
            key: "null" as stringful,
            terms: [],
            previous: true,
          }
        : JSON.parse(history) as ReturnType<typeof parse>;
    }

    const {
      setting: {
        alias,
        engines,
        reserved: {
          keys,
          selectors,
        },
      },
      input = "",
    } = this,
    {
      key,
      terms,
      previous = false,
    } = input === ""
      ? history(this.get("history"))
      : parse(
          input,
          new Set(Object.keys(engines)),
          alias,
          keys,
          new Set(selectors satisfies string as unknown as char[]),
        ),
    { [key]: entry as typeof engines[string] } = engines,
    options = typeof entry === "object"
      && !Array.isArray(entry);

    if (!history && (!options || !entry.noSave))
      this.set(
        "history",
        {
          key,
          terms,
          previous: true,
        },
      );

    const TAG = "%s" as stringful;

    return !options
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

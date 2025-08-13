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
    function history(history: string) {
      return history === ""
        ? {
            key: "null" as stringful,
            terms: [],
          }
        : JSON.parse(history) as {
          key: stringful;
          terms: stringful[];
        };
    }

    const {
      setting: {
        alias,
        engines,
        reserved,
      },
      input = "",
    } = this,
    { key, terms } = input === ""
      ? history(this.get("history"))
      : parse(
          input,
          new Set(Object.keys(engines)),
          alias,
          new Set(reserved.selectors satisfies string as unknown as char[]),
        ),
    { [key]: entry = engines["null"]! } = engines,
    entryOption = typeof entry === "object"
      && !Array.isArray(entry);

    if (!entryOption || !entry.noSave)
      this.set(
        "history",
        JSON.stringify(
          {
            key,
            terms,
          },
        ),
      );

    return !entryOption
      ? engine(
          key,
          terms,
          "browser",
          entry,
          this.stringful(reserved.tag),
        )
      : "url" in entry
        ? engine(
            key,
            terms,
            "browser",
            entry.url,
            this.stringful(reserved.tag),
            entry.prepend,
            entry.force,
            entry.separator,
          )
        : engine(
            key,
            terms,
            "shortcut",
            (entry.shortcut as Undefined<string>) ?? "",
            entry.notify,
            entry.prepend,
            entry.encode,
            entry.separator,
          );
  }
}

void new Search().run();

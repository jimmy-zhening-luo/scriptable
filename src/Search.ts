// icon-color: blue; icon-glyph: search;
import Shortcut from "./app";
import Parser from "./private/Search";
import Engine from "./private/Search/engine";
import type {
  SearchSetting,
  SearchOutput,
} from "./private/Search";

void new class Search extends Shortcut<
  SearchSetting,
  SearchOutput,
  string
> {
  protected runtime() {
    function history(history?: string) {
      return history === undefined
        ? {
            key: "null" as stringful,
            terms: [],
            prior: true,
          }
        : JSON.parse(history) as ReturnType<typeof Parser> & {
          prior: boolean;
        };
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
      prior = false,
    } = input === ""
      ? history(this.get("history"))
      : Parser(
        input,
        new Set(Object.keys(engines)),
        alias,
        keys,
        new Set(selectors satisfies string as unknown as char[]),
      ),
    engine = Engine(
      key,
      terms,
      engines[key]!,
    );
    
    if (!prior && !engine.noSave)
      this.set(
        "history",
        {
          key,
          terms,
          prior: true,
        },
      );

    return engine;
  }
}().run();

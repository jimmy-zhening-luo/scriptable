"blue search";
import Shortcut from "./app";
import parser from "./private/Search";
import resolver from "./private/Search/resolver";
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
    function history(
      fallback: stringful,
      history?: string,
    ) {
      return history === undefined
        ? {
            key: fallback,
            terms: [],
            prior: true,
          }
        : JSON.parse(history) as {
          key: stringful;
          terms: stringful[];
          prior: boolean;
        };
    }

    const {
      setting,
      input = "",
    } = this,
    parsed = input === ""
      ? history(
          setting.reserved.keys.skip,
          this.get(),
        )
      : parser(
        input,
        new Set(Object.keys(setting.engines)) as Set<stringful>,
        setting.alias,
        setting.reserved.keys,
        setting.reserved.selectors,
      ) as ReturnType<typeof parser> & Flag<
        | "prior"
      >,
    fulfiller = resolver(
      setting.engines[parsed.key]!,
      parsed,
    );

    if (!prior && fulfiller.noSave !== true)
      this.set(
        {
          key: parsed.key,
          terms: parsed.terms,
          prior: true,
        },
      );

    return fulfiller;
  }
}().run();

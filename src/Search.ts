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
      engines: SearchSetting["engines"],
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
      ? history(
          keys.skip,
          this.get(),
        )
      : parser(
        input,
        new Set(Object.keys(engines)) as Set<stringful>,
        alias,
        keys,
        selectors,
      ) as ReturnType<typeof parser> & Flag<
        | "prior"
      >,
    fulfiller = resolver(
      engines[key]!,
      key,
      terms,
    );

    if (!prior && fulfiller.noSave !== true)
      this.set(
        {
          key,
          terms,
          prior: true,
        },
      );

    return fulfiller;
  }
}().run();

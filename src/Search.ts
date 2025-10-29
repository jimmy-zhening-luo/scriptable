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
      if (history === undefined)
        return {
          engine: engines[fallback]!,
          key: fallback,
          terms: [],
          prior: true,
        };
      else {
        const parsed = JSON.parse(history) as {
          engine: SearchSetting["engines"][stringful];
          key: stringful;
          terms: stringful[];
          prior: boolean,
        };

        parsed.engine = engines[parsed.key]!;

        return parsed;
      }
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
      engine,
      key,
      terms,
      prior = false,
    } = input === ""
      ? history(
        engines,
        keys.skip,
        this.get(),
      )
      : parser(
        input,
        engines,
        alias,
        keys,
        selectors,
      ) as ReturnType<typeof parser> & Flag<
        | "prior"
      >,
    fulfiller = resolver(
      engine,
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

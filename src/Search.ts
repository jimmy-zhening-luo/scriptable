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
        const {
          key,
          terms,
        } = JSON.parse(history) as {
          key: stringful;
          terms: stringful[];
        },
        engine = engines[key];

        return engine === undefined
          ? {
              engine: engines[fallback]!,
              key: fallback,
              terms: [],
              invalidate: true,
            }
          : {
              engine,
              key,
              terms,
              prior: true,
            };
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
      invalidate = false,
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
        | "invalidate"
      >,
    fulfiller = resolver(
      engine,
      key,
      terms,
    );

    if (invalidate)
      this.unset();
    else if (
      !prior
      && fulfiller.noSave !== true
    )
      this.set(
        {
          key,
          terms,
        },
      );

    return fulfiller;
  }
}().run();

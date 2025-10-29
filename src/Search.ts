"blue search";
import Shortcut from "./app";
import {
  parser,
  resolver,
} from "./private/Search";
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
            prior: true as true,
          }
        : JSON.parse(history) as {
          key: stringful,
          terms: stringful[],
          prior: true,
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
      engine,
      key,
      terms,
      prior = false,
      invalidate = false,
    } = parser(
      input === ""
        ? history(
          keys.skip,
          this.get(),
        )
        : input,
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

    if (invalidate === true)
      this.unset();
    else if (
      prior !== true
      && fulfiller.noSave !== true
    )
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

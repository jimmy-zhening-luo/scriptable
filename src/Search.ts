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
    function history(history?: string) {
      return history === undefined
        ? {
            key: "null" as stringful,
            terms: [],
            prior: true,
          }
        : JSON.parse(history) as ReturnType<typeof Parser> & Flag<"prior">;
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
      ? history(this.get())
      : parser(
        input,
        engines,
        alias,
        keys,
        selectors,
      ) as ReturnType<typeof Parser> & Flag<"prior">,
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

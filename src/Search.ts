"blue search";
import Shortcut from "./app";
import * as search from "./private/Search";
import type { Setting, Output } from "./private/Search/types";

void new class Search extends Shortcut<
  Setting,
  Output,
  string
> {
  protected runtime() {
    const history = (
      fallback: stringful,
      history?: string,
    ) => history
      ? JSON.parse(history) as {
        key: stringful;
        terms: stringful[];
        prior: boolean;
      }
      : {
          key: fallback,
          terms: [],
          prior: true,
        },

    {
      setting,
      input = "",
    } = this,
    { skip } = setting.reserved.keys,
    {
      key,
      terms,
      prior,
    } = input
      ? search.parser(
        input,
        setting,
        skip,
      ) as ReturnType<typeof search.parser> & Flag<
        | "prior"
      >
      : history(skip, this.get());

    if (!prior && key !== skip)
      this.set({
        key,
        terms,
        prior: true,
      });

    return search.resolver(
      key,
      terms,
      key.length === 1
        ? setting.chars[key]!
        : setting.engines[key]!,
    );
  }
}().run();

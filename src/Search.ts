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
    const {
      setting,
      input = "",
    } = this,
    { skip } = setting.reserved.keys,
    history = (history?: string) => history
      ? JSON.parse(history) as {
        key: stringful;
        terms: stringful[];
        prior: boolean;
      }
      : {
          key: skip,
          terms: [],
          prior: true,
        },
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
      : history(this.get());

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

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
    function history(
      fallback: stringful,
      history?: string,
    ) {
      return history
        ? JSON.parse(history) as {
          key: stringful;
          terms: stringful[];
          prior: boolean;
        }
        : {
            key: fallback,
            terms: [],
            prior: true,
          };
    }

    const {
      setting,
      input = "",
    } = this,
    parsed = input
      ? search.parser(
        input,
        setting,
      ) as ReturnType<typeof search.parser> & Flag<
        | "prior"
      >
      : history(
          setting.reserved.keys.skip,
          this.get(),
        ),
    terms = Array.from(parsed.terms),
    fulfiller = search.resolver(
      parsed.key.length === 1
        ? setting.chars[parsed.key]!
        : setting.engines[parsed.key]!,
      parsed,
    );

    if (!parsed.prior && !fulfiller.noSave)
      this.set(
        {
          key: parsed.key,
          terms,
          prior: true,
        },
      );

    return fulfiller;
  }
}().run();

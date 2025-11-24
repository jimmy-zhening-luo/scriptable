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
    interface IParsedQuery {
      key: stringful;
      terms: stringful[];
      prior?: boolean;
    }

    const {
      setting,
      input = "",
    } = this,
    { skip } = setting.reserved.keys,
    history = (history?: string) => history
      ? JSON.parse(history) as IParsedQuery
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
      ) as IParsedQuery & ReturnType<typeof search.parser>
      : history(this.get()),
    engine = key === "/"
      ? history(this.get()).key
      : key;

    if (
      !prior
      && engine !== skip
      && engine !== "/"
    )
      this.set(
        {
          key: engine,
          terms,
          prior: true,
        } satisfies IParsedQuery,
      );

    return search.resolver(
      engine,
      terms,
      engine.length === 1
        ? setting.chars[engine]!
        : setting.engines[engine]!,
    );
  }
}().run();

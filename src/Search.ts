"blue search";
import Shortcut from "./app";
import * as search from "./private/Search";
import type {
  Setting,
  Query,
  Output,
} from "./private/Search/types";

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
    { skip } = setting.reserved,
    history = (history?: string) => history
      ? JSON.parse(history) as Query
      : {
          key: skip,
          terms: [],
          prior: true,
        };

    const enum Reserved {
      Repeat = "/",
    }
    const {
      key,
      terms,
      prior,
    } = input
      ? search.parser(
        input,
        setting,
        skip,
        Reserved.Repeat as char,
      ) as Query & ReturnType<typeof search.parser>
      : history(this.get()),
    engine = key === Reserved.Repeat
      ? history(this.get()).key
      : key;

    if (
      !prior
      && engine !== skip
      && engine !== Reserved.Repeat
    )
      this.set(
        {
          key: engine,
          terms,
          prior: true,
        } satisfies Query,
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

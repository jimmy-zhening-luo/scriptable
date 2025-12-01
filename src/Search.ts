"blue search";
import Shortcut from "./app";
import * as search from "./private/Search";
import type {
  Setting,
  Output,
  Query,
} from "./private/Search/types";

void new class Search extends Shortcut<
  Setting,
  Output
> {
  protected runtime() {
    const {
      setting,
      input = "",
    } = this;

    const enum Reserved {
      None = "none"
      Repeat = "/",
    }
    const history = (history?: string) => history
      ? JSON.parse(history) as Query
      : {
          key: Reserved.None,
          prior: true,
        },
    {
      key = history(this.get()).key,
      manifest = key.length === 1
        ? setting.chars[key]!
        : setting.engines[key]!,
      terms = [],
      prior = false,
    } = input
      ? search.parser(input, setting)
      : history(this.get());

    if (!prior && key !== Reserved.None)
      this.set(
        {
          key,
          terms,
          prior: true,
        } satisfies Required<Omit<Query, "manifest">>,
      );

    return search.resolver(
      key,
      terms,
      manifest,
    );
  }
}().run();

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
  Output,
  string,
  Require<Query, "key">
> {
  protected runtime() {
    const enum Reserved {
      None = "none",
    }

    const {
      setting,
      input = "",
    } = this,
    history = () => this.history ?? {
      key: Reserved.None as stringful,
      prior: true,
    } as NonNullable<typeof this.history>,
    parsed = input
      ? search.parser(input, setting)
      : history(),
    {
      terms = [],
      prior,
    } = parsed,
    {
      key,
      override,
      draft = setting.engines[key]!,
    } = parsed.key
      ? parsed as Required<typeof parsed>
      : history();

    if (!prior && key !== Reserved.None)
      this.history = override
        ? {
            key,
            terms,
            override,
            prior: true,
          }
        : {
            key,
            terms,
            prior: true,
          };

    return search.resolver(
      key,
      terms,
      draft,
      override,
    );
  }
}().run();

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
      None = "none",
    }

    type History = Require<Query, "key">;
    const history = (history?: string): History => history
      ? JSON.parse(history) as History
      : {
          key: Reserved.None as stringful,
          prior: true,
        },
    parsed = input
      ? search.parser(input, setting)
      : history(this.get()),
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
      : history(this.get());

    if (!prior && key !== Reserved.None)
      this.set(
        override
          ? {
            key,
            terms,
            prior: true,
          } satisfies History
          : {
            key,
            terms,
            override,
            prior: true,
          } satisfies History,
      );

    return search.resolver(
      key,
      terms,
      draft,
      override,
    );
  }
}().run();

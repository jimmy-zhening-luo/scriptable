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
    const history = (): History => {
      const history = this.history();

      return history
        ? JSON.parse(history) as History
        : {
            key: Reserved.None as stringful,
            prior: true,
          };
    },
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
      this.addHistory(
        override
          ? {
            key,
            terms,
            override,
            prior: true,
          } satisfies History
          : {
            key,
            terms,
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

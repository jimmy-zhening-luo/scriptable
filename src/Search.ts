// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Search extends shortcut<
    string,
    SearchOutput,
    SearchSetting
  > {
    private get Query() {
      try {
        return importModule(
          "apps/method/search/Query",
        ) as typeof Query;
      }
      catch (e) {
        throw new EvalError(
          `Search: import Query`,
          { cause: e },
        );
      }
    }

    public runtime() {
      const input: string = this
        .input ?? "";
      const {
        app,
        user: {
          engine,
          alias,
        },
      }: SearchSetting = this.setting.parsed;
      const TAG: stringful = this.stringful(
        app.tag,
        "app.tag",
      );
      const CHAT: stringful = this.stringful(
        app.key.chat,
        "app.chat",
      );
      const TRANSLATE: stringful = this.stringful(
        app.key.translate,
        "app.translate",
      );
      const MATH_SHORT: stringful = this.stringful(
        app.key.mathShort,
        "app.mathShort",
      );
      const MATH_LONG: stringful = this.stringful(
        app.key.mathLong,
        "app.mathLong",
      );
      const query: Query = new this.Query(
        input.length > 0
          ? input
          : this.read(),
        CHAT,
        TRANSLATE,
        MATH_SHORT,
        MATH_LONG,
      );
      const keys: string[] = Object
        .keys(
          engine,
        );
      const keyUnaliased: Null<string> = alias[query.key] ?? null;
      const key: Null<string> = keys
        .includes(
          query.key,
        )
        ? query.key
        : keyUnaliased === null
          ? null
          : keys
            .includes(
              keyUnaliased,
            )
            ? keyUnaliased
            : null;

      if (key === null)
        throw new ReferenceError(
          `Key is neither primary nor alias`,
        );

      const match: Null<
        SearchSetting["user"]["engine"][string]
      > = engine[key] ?? null;

      if (match === null)
        throw new ReferenceError(
          `Unexpected: Key is primary or alias, but engine[key] is null`,
        );

      const resolved: IEngine = typeof match === "string" || Array.isArray(match)
        ? new (this.Engine<typeof UrlEngine>("UrlEngine"))(
          match,
          TAG,
        )
        : "url" in match
          ? new (this.Engine<typeof UrlEngine>("UrlEngine"))(
            match.url,
            TAG,
            match.browser,
            match.encode,
          )
          : "shortcut" in match
            ? new (this.Engine<typeof ShortcutEngine>("ShortcutEngine"))(
              match.shortcut,
              match.output,
            )
            : "find" in match
              ? new (this.Engine<typeof FindEngine>("FindEngine"))(
                match.find,
              )
              : new (this.Engine<typeof InlineEngine>("InlineEngine"))(
                match.inline,
              );

      this.write(
        query.clean,
      );

      return resolved
        .parseQueryToAction(
          query,
        );
    }

    private Engine<T>(
      flavor: string,
    ): T {
      try {
        return importModule(
          `apps/method/search/engines/${
            flavor
          }`,
        ) as T;
      }
      catch (e) {
        throw new EvalError(
          `Search: import <T>Engine`,
          { cause: e },
        );
      }
    }
  }
}

new Search.Search()
  .run();

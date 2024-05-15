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
    private static get Query(): typeof Query {
      try {
        return importModule(
          "method/search/Query",
        ) as typeof Query;
      }
      catch (e) {
        throw new EvalError(
          `Search: import Query`,
          { cause: e },
        );
      }
    }

    private static Engine<T>(
      flavor: string,
    ): T {
      try {
        return importModule(
          `method/search/engines/${flavor}`,
        ) as T;
      }
      catch (e) {
        throw new EvalError(
          `Search: import <T>Engine`,
          { cause: e },
        );
      }
    }

    public runtime(): ReturnType<Search["run"]> {
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
      const MATH: stringful[] = app.key.math.map(
        (s: string): stringful =>
          this.stringful(
            s,
            "app.math",
          ),
      );
      const q: Query = new Search.Query(
        input.length > 0
          ? input
          : this.read(),
        CHAT,
        TRANSLATE,
        MATH,
      );
      const keys: string[] = Object
        .keys(
          engine,
        );
      const keyUnaliased: Null<string> = alias[q.key] ?? null;
      const key: Null<string> = keys
        .includes(
          q.key,
        )
        ? q.key
        : keyUnaliased === null
          ? null
          : keys
            .includes(
              keyUnaliased,
            )
            ? keyUnaliased
            : null;
      const cause = {
        cause: {
          input,
          cache: this.read(),
          parsed: {
            key,
            keyUnaliased,
            query: {
              key: q.key,
              terms: q.terms,
            },
          },
        },
      };

      if (key === null)
        throw new ReferenceError(
          `Key is neither primary nor alias`,
          { cause },
        );

      const match: Null<
        SearchSetting["user"]["engine"][string]
      > = engine[key] ?? null;

      if (match === null)
        throw new ReferenceError(
          `Unexpected: Key is primary or alias, but engine[key] is null`,
          { cause },
        );

      const resolved: IEngine = typeof match === "string" || Array.isArray(match)
        ? new (Search.Engine<typeof UrlEngine>("UrlEngine"))(
          match,
          TAG,
        )
        : "url" in match
          ? new (Search.Engine<typeof UrlEngine>("UrlEngine"))(
            match.url,
            TAG,
            match.browser,
            match.encode,
          )
          : "shortcut" in match
            ? new (Search.Engine<typeof ShortcutEngine>("ShortcutEngine"))(
              match.shortcut,
              match.output,
            )
            : "find" in match
              ? new (Search.Engine<typeof FindEngine>("FindEngine"))(
                match.find,
              )
              : new (Search.Engine<typeof InlineEngine>("InlineEngine"))(
                match.inline,
              );

      this.write(q.clean);

      return resolved
        .parseQueryToAction(q);
    }
  }
}

new Search.Search()
  .run();

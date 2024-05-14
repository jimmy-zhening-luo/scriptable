// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;
  const _Query: typeof Query = importModule(
    "method/search/Query",
  ) as typeof Query;
  const _InlineEngine: typeof InlineEngine = importModule(
    "method/search/engines/InlineEngine",
  ) as typeof InlineEngine;
  const _NativeEngine: typeof NativeEngine = importModule(
    "method/search/engines/NativeEngine",
  ) as typeof NativeEngine;
  const _ShortcutEngine: typeof ShortcutEngine = importModule(
    "method/search/engines/ShortcutEngine",
  ) as typeof ShortcutEngine;
  const _UrlEngine: typeof UrlEngine = importModule(
    "method/search/engines/UrlEngine",
  ) as typeof UrlEngine;

  export class Search extends shortcut<
    string,
    SearchOutput,
    SearchSetting
  > {
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
      const MATH: stringful[] = (app.key.math ?? []).map(
        (s: string): stringful =>
          this.stringful(
            s,
            "app.math?",
          ),
      );
      const q: Query = new _Query(
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
      const keyUnaliased: Nullable<string> = alias[q.key] ?? null;
      const key: Nullable<string> = keys
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

      const match = engine[key] ?? null;

      if (match === null)
        throw new ReferenceError(
          `Unexpected: Key is primary or alias, but engine[key] is null`,
          { cause },
        );

      const resolved: IEngine = "url" in match
        ? new _UrlEngine(
          match.url,
          TAG,
          match.browser,
          match.encode,
        )
        : "shortcut" in match
          ? new _ShortcutEngine(
            match.shortcut,
            match.output,
          )
          : "native" in match
            ? new _NativeEngine(
              match.native,
            )
            : new _InlineEngine(
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

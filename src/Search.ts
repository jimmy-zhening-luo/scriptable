// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;
  const query: typeof Query = importModule(
    "method/search/query/Query",
  ) as typeof Query;
  const appEngine: typeof AppEngine = importModule(
    "method/search/engines/AppEngine",
  ) as typeof AppEngine;
  const browserEngine: typeof BrowserEngine = importModule(
    "method/search/engines/BrowserEngine",
  ) as typeof BrowserEngine;
  const nativeEngine: typeof NativeEngine = importModule(
    "method/search/engines/NativeEngine",
  ) as typeof NativeEngine;
  const shortcutEngine: typeof ShortcutEngine = importModule(
    "method/search/engines/ShortcutEngine",
  ) as typeof ShortcutEngine;

  export class Search extends shortcut<
    string,
    SearchOutput,
    SearchSettings
  > {
    public runtime(): ReturnType<Search["run"]> {
      const input: string = this
        .inputString;
      const {
        app,
        user,
      }: SearchSettings = this.setting.parsed;
      const TAG: stringful = this.stringful(
        app.tag,
        "app.tag",
      );
      const CHAT: stringful = this.stringful(
        app.chat,
        "app.chat",
      );
      const TRANSLATE: stringful = this.stringful(
        app.translate,
        "app.translate",
      );
      const MATH: stringful[] = (app.math ?? []).map(
        (s: string): stringful =>
          this.stringful(
            s,
            "app.math?",
          ),
      );
      const q: Query = new query(
        input.length > 0
          ? input
          : this.read(),
        CHAT,
        TRANSLATE,
        MATH,
      );
      const match: Nullable<SearchEngineSetting> = user
        .engines
        .find(
          (eng: SearchEngineSetting): boolean =>
            eng.keys.includes(q.key),
        ) ?? null;

      if (match === null)
        throw new ReferenceError(
          `No search engine matches query key`,
          {
            cause: {
              input,
              cache: this.read(),
              parsed: {
                key: q.key,
                terms: q.terms,
                numTerms: q.terms.length,
              },
            },
          },
        );

      const resolved: IEngine = "url" in match
        ? new browserEngine(
          match.keys,
          match.url,
          TAG,
          match.browser,
          match.encode,
        )
        : "shortcut" in match
          ? new shortcutEngine(
            match.keys,
            match.shortcut,
            match.output,
          )
          : "native" in match
            ? new nativeEngine(
              match.keys,
              match.native,
            )
            : new appEngine(
              match.app,
              match.keys,
            );

      this.write(q.clean);

      return resolved
        .parseQueryToAction(q);
    }
  }

}

new Search.Search()
  .run();

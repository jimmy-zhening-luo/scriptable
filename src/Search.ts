// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut = importModule("system/Shortcut");

  export class Search extends shortcut<
    string,
    SearchOutput,
    SearchSetting
  > {
    private static get Query() {
      try {
        return importModule<typeof Query>(
          "apps/method/search/Query",
        );
      }
      catch (e) {
        throw new ReferenceError(
          `Search: import Query`,
          { cause: e },
        );
      }
    }

    protected runtime() {
      const { app, user } = this.setting,
      {
        tag,
        key: {
          chat,
          translate,
          mathShort,
          mathLong,
        },
        fallback: {
          one,
          two,
          three,
          rest,
        },
      } = app,
      { engines, alias } = user,
      [
        TAG,
        CHAT,
        TRANSLATE,
        MATH_SHORT,
        MATH_LONG,
        ONE,
        TWO,
        THREE,
        REST,
      ] = this.stringfuls([
        tag,
        chat,
        translate,
        mathShort,
        mathLong,
        one,
        two,
        three,
        rest,
      ]) satisfies stringful[] as unknown as Nonad<stringful>,
      query = new Search.Query(
        this.inputString.length > 0
          ? this.inputString
          : this.read(),
        CHAT,
        TRANSLATE,
        MATH_SHORT,
        MATH_LONG,
        ONE,
        TWO,
        THREE,
        REST,
      ),
      keyToken = query.key,
      dealias = alias[keyToken] ?? null;

      query.lock(
        keyToken in engines
          ? keyToken
          : dealias !== null && dealias in engines && dealias.length > 0
            ? dealias as stringful
            : null,
      );

      const { key } = query,
      setting = engines[key] ?? null;

      if (setting === null)
        throw new ReferenceError(
          `Search key has no engine setting`,
          { cause: key },
        );
      else {
        const engine = Array.isArray(setting) || typeof setting === "string"
          ? new (this.SearchEngine<typeof UrlEngine>("UrlEngine"))(
            setting,
            TAG,
          )
          : "url" in setting
            ? new (this.SearchEngine<typeof UrlEngine>("UrlEngine"))(
              setting.url,
              TAG,
              setting.browser,
              setting.separator,
              setting.encodeComponent,
              setting.inprivate,
              setting.output,
            )
            : "shortcut" in setting
              ? new (this.SearchEngine<typeof ShortcutEngine>("ShortcutEngine"))(
                setting.shortcut,
                setting.output,
              )
              : new (this.SearchEngine<typeof FindEngine>("FindEngine"))(setting.find);

        this.write(String(query));

        return engine.resolve(query);
      }
    }

    private SearchEngine<T>(provider: string | Fake<T>): T {
      try {
        return importModule<T>(
          `apps/method/search/engines/${provider}`,
        );
      }
      catch (e) {
        throw new ReferenceError(
          `Search: import <T>SearchEngine`,
          { cause: e },
        );
      }
    }
  }
}

(new Search.Search).run();

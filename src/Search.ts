// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

import type { Shortcut } from "./system/Shortcut";
import type { Query } from "./apps/method/search/query/index";
import type BrowserEngine from "./apps/method/search/engines/browser";
import type FindEngine from "./apps/method/search/engines/find";
import type ShortcutEngine from "./apps/method/search/engines/shortcut";

type SearchEngines = {
  browser: typeof BrowserEngine;
  find: typeof FindEngine;
  shortcut: typeof ShortcutEngine;
};

namespace Search {
  const shortcut = importModule<typeof Shortcut>("./system/Shortcut");

  export class Search extends shortcut<
    string,
    SearchOutput,
    SearchSetting
  > {
    private static get Query() {
      return importModule<typeof Query>("./apps/method/search/query/index");
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
        this.inputString.length > 0 ? this.inputString : this.read(),
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
        throw new ReferenceError(`Search key has no engine setting`, { cause: key });
      else {
        const engine = Array.isArray(setting) || typeof setting === "string"
          ? new (this.SearchEngine("browser"))(setting, TAG)
          : "url" in setting
            ? new (this.SearchEngine("browser"))(
              setting.url,
              TAG,
              setting.browser,
              setting.separator,
              setting.encodeComponent,
              setting.inprivate,
              setting.output,
            )
            : "shortcut" in setting
              ? new (this.SearchEngine("shortcut"))(setting.shortcut, setting.output)
              : new (this.SearchEngine("find"))(setting.find);

        this.write(String(query));

        return engine.resolve(query);
      }
    }

    private SearchEngine<T extends "browser" | "find" | "shortcut">(provider: T) {
      return importModule<SearchEngines[T]>(`./apps/method/search/engines/${provider}`);
    }
  }
}

(new Search.Search).run();

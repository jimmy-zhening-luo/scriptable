// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

import type { Shortcut } from "./lib";
import type { Query } from "./apps/method/search/query";
import type BrowserEngine from "./apps/method/search/engines/browser";
import type FindEngine from "./apps/method/search/engines/find";
import type ShortcutEngine from "./apps/method/search/engines/shortcut";

type SearchEngines = {
  browser: typeof BrowserEngine;
  find: typeof FindEngine;
  shortcut: typeof ShortcutEngine;
};

class Search extends importModule<typeof Shortcut<
  Field<
    | "query"
    | "clipboard"
  >,
  SearchOutput,
  SearchSetting
>>("./lib") {
  private static get Query() {
    return importModule<typeof Query>("./apps/method/search/query");
  }

  private static Engine<T extends "browser" | "find" | "shortcut">(provider: T) {
    return importModule<SearchEngines[T]>(`./apps/method/search/engines/${provider}`);
  }

  protected runtime() {
    const { inputful, setting } = this,
    input = inputful.query.length > 0 ? inputful.query : this.read(),
    {
      tag,
      engines,
      alias,
      reserved: { selector, operators },
      defaults: {
        math,
        translate,
        fallback,
      },
    } = setting,
    query = new Search.Query(
      input,
      engines,
      alias,
      ...Search.stringfuls([
        selector,
        operators,
        math,
        translate,
        ...fallback,
      ] as const),
    ),
    entry = query.engine,
    engine = Array.isArray(entry) || typeof entry === "string"
      ? new (Search.Engine("browser"))(entry, Search.stringful(tag))
      : "url" in entry
        ? new (Search.Engine("browser"))(
          entry.url,
          Search.stringful(tag),
          entry.browser,
          entry.separator,
          entry.encodeComponent,
          entry.inprivate,
        )
        : "shortcut" in entry
          ? new (Search.Engine("shortcut"))(entry.shortcut, entry.output)
          : new (Search.Engine("find"))(entry.find);

    this.write(String(query));

    return engine.resolve(query);
  }
}

new Search().run();

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Search extends shortcut<
    string
    ,
    SearchOutput
    ,
    SearchSetting
  > {
    private get Query() {
      return importModule(
        "apps/method/search/Query",
      ) as typeof Query;
    }

    protected runtime() {
      const {
        app,
        user,
      } = this;
      const {
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
      } = app;
      const {
        engine,
        alias,
      } = user;
      const [
        TAG,
        CHAT,
        TRANSLATE,
        MATH_SHORT,
        MATH_LONG,
        ONE,
        TWO,
        THREE,
        REST,
      ] = [
        tag,
        chat,
        translate,
        mathShort,
        mathLong,
        one,
        two,
        three,
        rest,
      ]
        .map(
          key =>
            this
              .stringful(
                key,
              ),
        ) as Tuple<
        stringful
        ,
        9
      >;
      const query = new this
        .Query(
          this
            .inputString
            .length > 0
            ? this
              .inputString
            : this
              .read(),
          CHAT,
          TRANSLATE,
          MATH_SHORT,
          MATH_LONG,
          ONE,
          TWO,
          THREE,
          REST,
        );
      const keyToken = query
        .key;

      query
        .lock(
          keyToken in engine
            ? keyToken
            : keyToken in alias
              ? (
                  alias[
                    keyToken
                  ] as string
                ) in engine
                ? alias[
                    keyToken
                  ] as stringful
                : null
              : null,
        );

      const { key } = query;
      const config = engine[
        key
      ]
        ?? null;

      if (
        config === null
      )
        throw new ReferenceError(
          `Engine config missing for key`,
          { cause: { key } },
        );
      else {
        const resolver: IEngine = Array.isArray(
            config,
          )
          || typeof config === "string"
            ? new (
              this
                .Engine<typeof UrlEngine>(
                "UrlEngine",
              )
            )(
              config,
              TAG,
            )
            : "url" in config
              ? new (
                this
                  .Engine<typeof UrlEngine>(
                  "UrlEngine",
                )
              )(
                config
                  .url,
                TAG,
                config
                  .browser,
                config
                  .separator,
                config
                  .encodeComponent,
              )
              : "shortcut" in config
                ? new (
                  this
                    .Engine<typeof ShortcutEngine>(
                    "ShortcutEngine",
                  )
                )(
                  config
                    .shortcut,
                  config
                    .output,
                  config
                    .write,
                )
                : "find" in config
                  ? new (
                    this
                      .Engine<typeof FindEngine>(
                      "FindEngine",
                    )
                  )(
                    config
                      .find,
                  )
                  : new (
                    this
                      .Engine<typeof InlineEngine>(
                      "InlineEngine",
                    )
                  )(
                    config
                      .inline,
                  );

        this
          .write(
            String(
              query,
            ),
          );

        return resolver
          .resolve(
            query,
          );
      }
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

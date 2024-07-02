// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut = importModule(`system/Shortcut`) as typeof Shortcut;

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
        engines,
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
      const dealias = alias[
        keyToken
      ]
      ?? null;

      query
        .lock(
          keyToken in engines
            ? keyToken
            : dealias !== null
              ? dealias in engines
                ? dealias
                  .length > 0
                  ? dealias as stringful
                  : null
                : null
              : null,
        );

      const { key } = query;
      const setting = engines[
        key
      ]
      ?? null;

      if (
        setting === null
      )
        throw new ReferenceError(
          `Engine setting missing for key`,
          { cause: { key } },
        );
      else {
        const engine: IEngine = Array.isArray(
          setting,
        )
        || typeof setting === "string"
          ? new (
            this
              .Engine<typeof UrlEngine>(
                "UrlEngine",
              )
          )(
            setting,
            TAG,
          )
          : "url" in setting
            ? new (
              this
                .Engine<typeof UrlEngine>(
                  "UrlEngine",
                )
            )(
              setting
                .url,
              TAG,
              setting
                .browser,
              setting
                .separator,
              setting
                .encodeComponent,
              setting
                .postfix,
            )
            : "shortcut" in setting
              ? new (
                this
                  .Engine<typeof ShortcutEngine>(
                    "ShortcutEngine",
                  )
              )(
                setting
                  .shortcut,
                setting
                  .output,
                setting
                  .write,
                setting
                  .postfix,
              )
              : new (
                this
                  .Engine<typeof FindEngine>(
                    "FindEngine",
                  )
              )(
                setting
                  .find,
              );

        this
          .write(
            String(
              query,
            ),
          );

        return engine
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

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;
  const stringful: typeof Stringful = importModule("common/types/strings/Stringful") as typeof Stringful;

  export class Search extends shortcut<
    SearchInput,
    SearchOutput,
    SearchSettings
  > {
    public runtime(): Nullable<SearchOutput> {
      try {
        const {
          app,
          user,
        }: SearchSettings = this.setting.unmerged;
        const TAG: stringful = stringful(
          app.tag,
          "app.tag",
        );
        const CHAT: stringful = stringful(
          app.chat,
          "app.chat",
        );
        const TRANSLATE: stringful = stringful(
          app.translate,
          "app.translate",
        );
        const MATH: stringful[] = (app.math ?? []).map(
          s =>
            stringful(
              s,
              "app.math?",
            ),
        );
        const input: string = this.inputData?.input ?? "";
        const query: Query = new Query(
          input.length === 0
            ? this.read()
            : input,
          this.inputData?.clip ?? "",
          CHAT,
          TRANSLATE,
          MATH,
        );
        const match: Nullable<SearchEngineSetting> = user
          .engines
          .find(
            eng =>
              eng.keys.includes(query.key),
          ) ?? null;
        const resolved: Nullable<Engine> = match === null
          ? null
          : "url" in match
            ? new BrowserEngine(
              match.keys,
              match.url,
              TAG,
              match.browser,
              match.encode,
            )
            : "shortcut" in match
              ? new ShortcutEngine(
                match.keys,
                match.shortcut,
                match.output,
              )
              : "native" in match
                ? new NativeEngine(
                  match.keys,
                  match.native,
                )
                : new AppEngine(
                  match.app,
                  match.keys,
                );

        if (resolved)
          this.write(query.clean);

        return resolved
          ?.parseQueryToAction(query) ?? null;
      }
      catch (e) {
        throw new EvalError(
          `Search: runtime`,
          { cause: e },
        );
      }
    }
  }

  class Query {
    public readonly key: stringful;
    public readonly terms: stringful[];

    constructor(
      query: string,
      clip: string,
      chat: stringful,
      translate: stringful,
      math: stringful[] = [],
    ) {
      try {
        const tokens: stringful[] = [
          ...Query.mathefy(
            Query.transliterate(
              Query.tokenize(
                query,
                chat,
              ),
              translate,
            ),
            math,
          ),
        ];

        if (tokens.length === 1)
          tokens.push(...Query.tokenize(clip));

        if (tokens.length === 0)
          throw new SyntaxError(
            `Query resolved to 0 tokens`,
          );
        else {
          this.key = tokens
            .shift()!
            .toLowerCase() as stringful;
          this.terms = [...tokens];
        }
      }
      catch (e) {
        throw new EvalError(
          `Query: ctor \n${e as string}`,
        );
      }
    }

    public get natural(): string {
      try {
        return this
          .terms
          .join(" ");
      }
      catch (e) {
        throw new EvalError(
          `Query: clean`,
          { cause: e },
        );
      }
    }

    public get clean(): stringful {
      try {
        return this.key + " " + this.natural as stringful;
      }
      catch (e) {
        throw new EvalError(
          `Query: clean`,
          { cause: e },
        );
      }
    }

    private static tokenize(
      query: string,
      CHAT?: stringful,
    ): stringful[] {
      try {
        const pre: stringful[] = CHAT === undefined
          ? []
          : query.startsWith(" ")
            ? [CHAT]
            : [];

        return [
          ...pre,
          ...query
            .trim()
            .split(" ")
            .filter(
              t =>
                t.length !== 0,
            ) as stringful[],
        ];
      }
      catch (e) {
        throw new EvalError(
          `Query: tokenize`,
          { cause: e },
        );
      }
    }

    private static transliterate(
      tokens: stringful[],
      TRANSLATE: stringful,
    ): stringful[] {
      try {
        if (tokens.length < 1)
          return [];
        else {
          const LANG: stringful = "@" as stringful; // static
          const t_0: stringful = tokens[0]!.toLowerCase() as stringful;
          const pre: stringful[] = t_0.length > 1
            ? t_0.startsWith(LANG)
              ? [TRANSLATE]
              : t_0.startsWith(TRANSLATE)
                ? t_0.slice(
                    TRANSLATE.length,
                    TRANSLATE.length + LANG.length,
                  ) === LANG
                  ? [
                      TRANSLATE,
                      tokens
                        .shift()!
                        .slice(TRANSLATE.length) as stringful,
                    ]
                  : t_0.length > TRANSLATE.length
                    ? [
                        TRANSLATE,
                        (LANG + t_0[TRANSLATE.length]) as stringful,
                        ...tokens.shift()!.length > TRANSLATE.length + LANG.length
                          ? [
                              t_0.slice(
                                TRANSLATE.length + LANG.length
                              ) as stringful,
                            ]
                          : []
                      ]
                    : []
                : []
            : [];

          return [
            ...pre,
            ...tokens,
          ];
        }
      }
      catch (e) {
        throw new EvalError(
          `Query: transliterate`,
          { cause: e },
        );
      }
    }

    private static mathefy(
      T: stringful[],
      M: stringful[],
    ): stringful[] {
      try {
        if (
          M.length > 0
          && T.length > 0
          && T[0] !== undefined
        ) {
          const t_0: stringful = T[0].toLowerCase() as stringful;
          const t_0_len: number = t_0.length;
          const math_long: Nullable<stringful> = [...M]
            .filter(
              mk =>
                mk.length <= t_0_len,
            )
            .sort(
              (a, b) =>
                b.length - a.length,
            )
            .find(
              mk =>
                t_0.startsWith(mk),
            ) ?? null;

          if (math_long !== null) {
            const operand_0: string = T
              .shift()
              ?.slice(math_long.length) ?? "";

            if (operand_0.length !== 0)
              T.unshift(operand_0 as stringful);

            T.unshift(math_long);
          }
          else {
            const math_short: Nullable<stringful> = [...M]
              .sort(
                (a, b) =>
                  a.length - b.length,
              )
              .shift() ?? null;

            if (math_short !== null) {
              const d: stringful[] = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "(",
                ")",
                "[",
                "]",
                "{",
                "}",
                ".",
                ",",
                ":",
                ";",
                "-",
                "_",
                "+",
                "*",
                "/",
                "\\",
                "^",
                "%",
                "~",
                "=",
                "<",
                ">",
                "|",
                "&",
                "`",
                "'",
                "\"",
                "?",
                "!",
                "#",
                "$",
                "°",
              ] as stringful[]; // static

              if (d.includes(t_0[0] as stringful))
                T.unshift(math_short);
            }
          }
        }

        return T;
      }
      catch (e) {
        throw new EvalError(
          `Query: mathefy`,
          { cause: e },
        );
      }
    }
  }

  abstract class Engine {
    public readonly app: stringful;
    public readonly keys: stringful[];

    constructor(
      app: string,
      keys: string | string[],
    ) {
      try {
        if (app.length === 0)
          throw new SyntaxError(
            `engine app name is empty`,
          );
        else {
          this.app = app as stringful;
          this.keys = [keys]
            .flat()
            .map(
              key =>
                key.toLowerCase(),
            )
            .filter(
              key =>
                key.length !== 0,
            ) as stringful[];

          if (this.keys.length === 0)
            throw new SyntaxError(
              `engine keys is empty`,
            );
        }
      }
      catch (e) {
        throw new EvalError(
          `Engine: ctor`,
          { cause: e },
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        return {
          app: this.app,
          actions: this.transform(query),
          ...this.options(query),
        };
      }
      catch (e) {
        throw new EvalError(
          `Engine: parseQueryToAction`,
          { cause: e },
        );
      }
    }

    protected transform(query: Query): string | string[] {
      try {
        return query.natural;
      }
      catch (e) {
        throw new EvalError(
          `Engine: transform`,
          { cause: e },
        );
      }
    }

    protected abstract options(query: Query): Omit<SearchOutput, "app" | "actions">;
  }

  class BrowserEngine extends Engine {
    public readonly urls: stringful[];
    public readonly tag: stringful;
    public readonly browser: BrowserAction;
    public readonly encode: BrowserEncode;

    constructor(
      keys: string | string[],
      urls: string | string[],
      TAG: stringful,
      browser: BrowserAction = "default",
      encode: BrowserEncode = "+",
    ) {
      try {
        super(
          "safari",
          keys,
        );
        this.tag = TAG;
        this.browser = browser; // unsafe
        this.encode = encode; // unsafe
        this.urls = [urls]
          .flat()
          .filter(
            url =>
              url.length !== 0,
          ) as stringful[];

        if (this.urls.length === 0)
          throw new SyntaxError(
            `engine has 0 urls`,
          );
      }
      catch (e) {
        throw new EvalError(
          `BrowserEngine: ctor`,
          { cause: e },
        );
      }
    }

    protected override transform(query: Query): string[] {
      try {
        const OP: string = "+"; //static
        const ENCODED_OP: string = "%2B";
        const encodedQuery: string = query
          .terms
          .map(
            term =>
              term
                .split(OP)
                .map(
                  operand =>
                    encodeURI(operand),
                )
                .join(ENCODED_OP),
          )
          .join(this.encode);

        return this
          .urls
          .map(
            url =>
              url.replace(
                this.tag,
                encodedQuery,
              ),
          );
      }
      catch (e) {
        throw new EvalError(
          `BrowserEngine: transform`,
          { cause: e },
        );
      }
    }

    protected options(query: Query): Required<Pick<SearchOutput, "natural" | "browser">> {
      try {
        return {
          natural: query.natural,
          browser: this.browser,
        };
      }
      catch (e) {
        throw new EvalError(
          `BrowserEngine: options`,
          { cause: e },
        );
      }
    }
  }

  class AppEngine extends Engine {
    protected options(): Record<string, never> {
      try {
        return {};
      }
      catch (e) {
        throw new EvalError(
          `AppEngine: options`,
          { cause: e },
        );
      }
    }
  }

  class NativeEngine extends Engine {
    public readonly native: stringful;

    constructor(
      keys: string | string[],
      native: string,
    ) {
      try {
        super(
          "native",
          keys,
        );

        if (native.length === 0)
          throw new SyntaxError(
            `engine native provider is empty`,
          );
        else
          this.native = native as stringful;
      }
      catch (e) {
        throw new EvalError(
          `NativeEngine: ctor`,
          { cause: e },
        );
      }
    }

    protected options(): Required<Pick<SearchOutput, "native">> {
      try {
        return { "native": this.native };
      }
      catch (e) {
        throw new EvalError(
          `NativeEngine: options`,
          { cause: e },
        );
      }
    }
  }

  class ShortcutEngine extends Engine {
    public readonly shortcut: stringful;
    public readonly output: boolean;

    constructor(
      keys: string | string[],
      shortcut: string,
      output: boolean = false,
    ) {
      try {
        super(
          "shortcut",
          keys,
        );

        if (this.shortcut.length === 0)
          throw new SyntaxError(
            `engine shortcut name is empty`,
          );
        else {
          this.shortcut = shortcut as stringful;
          this.output = output;
        }
      }
      catch (e) {
        throw new EvalError(
          `ShortcutEngine: ctor`,
          { cause: e },
        );
      }
    }

    protected options(): Required<Pick<SearchOutput, "shortcut" | "output">> {
      try {
        return {
          shortcut: this.shortcut,
          output: this.output,
        };
      }
      catch (e) {
        throw new EvalError(
          `ShortcutEngine: options`,
          { cause: e },
        );
      }
    }
  }
}

new Search.Search()
  .run();

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
"use strict";

namespace Search {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class Search extends shortcut<
    SearchInput,
    null | SearchOutput,
    SearchSettings
  > {
    public runtime(): null | SearchOutput {
      try {
        const {
          app,
          user,
        }: SearchSettings = this.setting.unmerged;

        const TAG: string = app.queryTag;

        if (TAG === "")
          throw new SyntaxError(
            `No querytag configured.`,
          );
        else {
          const MATH_KEYS: string | string[] = app.mathKeys ?? [];

          const input: string = this.inputData?.input ?? "";

          const query: Query = new Query(
            input === ""
              ? this.read()
              : input,
            this.inputData?.clip ?? "",
            MATH_KEYS,
          );

          if (query.key === "") {
            if (query.terms.length < 1)
              throw new SyntaxError(
                `Final query is empty`,
              );
            else
              throw new EvalError(
                `Unexpected: final query has no key, but has terms: ${query.terms.join(", ")}`,
              );
          }
          else {
            const resolved: null | Engine = user
              .engines
              .filter(
                eng => "keys" in eng,
              )
              .filter(
                eng => "url" in eng || "app" in eng || "shortcut" in eng || "native" in eng,
              )
              .map(
                eng => "url" in eng
                  ? new BrowserEngine(
                    eng.keys,
                    eng.url,
                    TAG,
                    eng.browser,
                    eng.encode,
                  )
                  : "shortcut" in eng
                  ? new ShortcutEngine(
                    eng.keys,
                    eng.shortcut,
                    eng.output,
                  )
                    : "native" in eng
                      ? new NativeEngine(
                        eng.keys,
                        eng.native,
                      )
                      : new AppEngine(
                        eng.keys,
                        eng.app,
                      ),
              )
              .find(
                eng => eng
                  .keys
                  .includes(
                    query.key,
                  ),
              ) ?? null;

            if (resolved)
              this.write(
                query.clean,
              );

            return resolved
              ?.parseQueryToAction(
                query,
              ) ?? null;
          }
        }
      }
      catch (e) {
        throw new EvalError(
          `Search: runtime: \n${e as string}`,
        );
      }
    }
  }

  class Query {
    public readonly key: string;
    public readonly terms: string[];

    constructor(
      query: string,
      clip: string,
      mathKeys: string | string[] = [],
    ) {
      try {
        const tokens: string[] = [
          ...Query.mathefy(
            Query.tokenize(query),
            mathKeys,
          ),
        ];

        if (tokens.length === 1)
          tokens
            .push(
              ...Query.tokenize(clip),
            );

        this.key = tokens
          .shift()
          ?.toLowerCase() ?? "";

        this.terms = [...tokens];

        if (this.key === "" && this.terms.length > 0)
          throw new EvalError(
            `Unexpected: Query.key is empty but Query.terms has value: ${this.terms.join(", ")}`,
          );
      }
      catch (e) {
        throw new EvalError(
          `Query: ctor \n${e as string}`,
        );
      }
    }

    public get clean(): string {
      try {
        return [
          this.key,
          ...this.terms,
        ]
          .join(" ");
      }
      catch (e) {
        throw new EvalError(
          `Query: clean: \n${e as string}`,
        );
      }
    }

    private static tokenize(
      query: string,
    ): string[] {
      try {
        return query
          .trim()
          .split(" ");
      }
      catch (e) {
        throw new EvalError(
          `Query: tokenize: \n${e as string}`,
        );
      }
    }

    private static mathefy(
      tokens: string[],
      mathKeys: string | string[],
    ): string[] {
      try {
        const T: string[] = [...tokens];
        const M: string[] = [mathKeys]
          .flat()
          .filter(
            mk => mk !== "",
          )
          .filter(
            mk => mk.length > 0,
          )
          .map(
            mk => mk.toLowerCase(),
          );

        if (
          M.length > 0
          && T.length > 0
          && T[0] !== undefined
          && T[0] !== ""
        ) {
          const t_0: string = T[0].toLowerCase();
          const math_long: string = [...M]
            .filter(
              mk => mk.length <= t_0.length,
            )
            .sort(
              (a, b) => b.length - a.length,
            )
            .find(
              mk => t_0.startsWith(
                mk,
              ),
            ) ?? "";

          if (math_long !== "") {
            const operand_0: string = T.shift()
              ?.slice(
                math_long.length,
              ) ?? "";

            if (operand_0 !== "")
              T.unshift(operand_0);

            T.unshift(math_long);
          }
          else {
            const math_short: string = [...M]
              .sort(
                (a, b) => a.length - b.length,
              )
              .shift() ?? "";

            if (math_short !== "") {
              const d: string[] = [
                ...[
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                ]
                  .map(
                    n => String(n),
                  ),
                ...[
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}",
                ],
                ...[
                  ".",
                  ",",
                  ":",
                  ";",
                ],
                ...[
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
                ],
                ...[
                  "|",
                  "&",
                ],
                ...[
                  "`",
                  "'",
                  "\"",
                ],
                ...[
                  "?",
                  "!",
                  "@",
                  "#",
                ],
                ...[
                  "$",
                ],
                ...[
                  "€",
                  "£",
                  "¥",
                  "₩",
                  "₽",
                  "₹",
                  "₪",
                  "₺",
                  "¢",
                ],
                ...[
                  "°",
                ],
              ]
                .filter(
                  n => n !== "",
                );

              if (
                d.includes(
                  t_0.slice(
                    0,
                    1,
                  ),
                )
              )
                T.unshift(math_short);
            }
          }
        }

        return T;
      }
      catch (e) {
        throw new EvalError(
          `Query: mathefy: \n${e as string}`,
        );
      }
    }
  }

  abstract class Engine {
    public readonly keys: string[];

    constructor(keys: string | string[]) {
      try {
        this.keys = [keys]
          .flat()
          .map(key => key.toLowerCase());
      }
      catch (e) {
        throw new EvalError(
          `Engine: ctor: \n${e as string}`,
        );
      }
    }

    public abstract parseQueryToAction(query: Query): SearchOutput;
  }

  class BrowserEngine extends Engine {
    public readonly url: string[];
    public readonly tag: string;
    public readonly browser: BrowserAction;
    public readonly encode: BrowserEncode;

    constructor(
      keys: string | string[],
      url: string | string[],
      tag: string,
      browser: BrowserAction = "default",
      encode: BrowserEncode = "+",
    ) {
      try {
        super(keys);
        this.tag = tag;
        this.browser = browser;
        this.encode = encode;
        this.url = [url]
          .flat();
      }
      catch (e) {
        throw new EvalError(
          `BrowserEngine: ctor: \n${e as string}`,
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        const urlEncodedQueryTerms: string = query
          .terms
          .map(term =>
            term
              .split("+")
              .map(operand =>
                encodeURI(operand))
              .join("%2B"))
          .join(this.encode);
        const actions: string[] = this
          .url
          .map(u =>
            u.replace(
              this.tag,
              urlEncodedQueryTerms,
            ));

        return {
          query: {
            key: query.key,
            terms: query.terms,
          },
          app: "safari",
          actions: actions,
          browser: this.browser,
        };
      }
      catch (e) {
        throw new EvalError(
          `BrowserEngine: parseQueryToAction: \n${e as string}`,
        );
      }
    }
  }

  class AppEngine extends Engine {
    public readonly app: string;

    constructor(
      keys: string | string[],
      app: string,
    ) {
      try {
        super(keys);
        this.app = app;
      }
      catch (e) {
        throw new EvalError(
          `AppEngine: ctor: \n${e as string}`,
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        return {
          query: {
            key: query.key,
            terms: query.terms,
          },
          app: this.app,
          actions: query
            .terms
            .join(" "),
        };
      }
      catch (e) {
        throw new EvalError(
          `AppEngine: parseQueryToAction: \n${e as string}`,
        );
      }
    }
  }

  class NativeEngine extends Engine {
    public readonly native: string;

    constructor(
      keys: string | string[],
      native: string,
    ) {
      try {
        super(keys);
        this.native = native;
      }
      catch (e) {
        throw new EvalError(
          `NativeEngine: ctor: \n${e as string}`,
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        return {
          query: {
            key: query.key,
            terms: query.terms,
          },
          app: "native",
          actions: query
            .terms
            .join(" "),
          native: this.native,
        };
      }
      catch (e) {
        throw new EvalError(
          `NativeEngine: parseQueryToAction: \n${e as string}`,
        );
      }
    }
  }

  class ShortcutEngine extends Engine {
    public readonly shortcut: string;
    public readonly output: boolean;

    constructor(
      keys: string | string[],
      shortcut: string,
      output: boolean = false,
    ) {
      try {
        super(keys);
        this.shortcut = shortcut;
        this.output = output;
      }
      catch (e) {
        throw new EvalError(
          `ShortcutEngine: ctor: \n${e as string}`,
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        return {
          query: {
            key: query.key,
            terms: query.terms,
          },
          app: "shortcut",
          actions: query
            .terms
            .join(" "),
          shortcut: this.shortcut,
          output: this.output,
        };
      }
      catch (e) {
        throw new EvalError(
          `ShortcutEngine: parseQueryToAction: \n${e as string}`,
        );
      }
    }
  }
}

new Search.Search()
  .run();
Script.complete();

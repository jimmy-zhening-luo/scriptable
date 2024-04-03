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

        const TAG: string = app?.queryTag ?? user.queryTag ?? "";

        if (TAG === "")
          throw new SyntaxError(
            `Search: runtime: No query tag provided.`,
          );
        else {
          const MATH_KEYS: string | string[] = app?.mathKeys ?? [];

          const query: Query = new Query(
            this.inputData === null
              ? this.readStorage()
              : this.inputData.input,
            this.inputData?.clip ?? "",
            MATH_KEYS,
          );

          if (query.key === "")
            return null;
          else {
            const resolved: null | Engine = user
              .engines
              .filter(
                eng => "keys" in eng,
              )
              .filter(
                eng => "urls" in eng || "app" in eng,
              )
              .map(
                eng => "urls" in eng
                  ? new BrowserEngine(
                    eng.keys,
                    eng.urls,
                    TAG,
                    eng.browser,
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
              this.writeStorage(
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
          `Search: runtime: Error running app: \n${e as string}`,
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
          ?.toLowerCase()
          .replace(
            ".",
            "",
          ) ?? "";

        this.terms = [...tokens];
      }
      catch (e) {
        throw new SyntaxError(
          `SearchQuery: constructor: Error creating SearchQuery object: \n${e as string}`,
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
          `SearchQuery: clean: Error cleaning query: \n${e as string}`,
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
        throw new SyntaxError(
          `SearchQuery: tokenize: Error tokenizing query: \n${e as string}`,
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
            const operand_0: string = t_0.slice(
              math_long.length,
            );

            if (operand_0 !== "") {
              T.shift();
              T.unshift(operand_0);
              T.unshift(math_long);
            }
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
        throw new SyntaxError(
          `SearchQuery: mathefy: Error checking (& transforming) query for mathiness: \n${e as string}`,
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
          `SearchEngine: constructor: Error creating SearchEngine object: \n${e as string}`,
        );
      }
    }

    public abstract parseQueryToAction(query: Query): SearchOutput;
  }

  class BrowserEngine extends Engine {
    public readonly urls: string[];
    public readonly tag: string;
    public readonly browser: BrowserAction;

    constructor(
      keys: string | string[],
      urls: string | string[],
      tag: string,
      browser: BrowserAction = "default",
    ) {
      try {
        super(keys);
        this.urls = [urls].flat();
        this.tag = tag;
        this.browser = browser;
      }
      catch (e) {
        throw new EvalError(
          `BrowserSearchEngine: constructor: Error creating BrowserSearchEngine object: \n${e as string}`,
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
          .join("+");
        const actions: string[] = this
          .urls
          .map(url =>
            url.replace(
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
        throw new SyntaxError(
          `BrowserSearchEngine: parseQueryToAction: Error parsing query to action: \n${e as string}`,
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
          `AppSearchEngine: constructor: Error creating AppSearchEngine object: \n${e as string}`,
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
          actions: [
            query
              .terms
              .join(" "),
          ],
        };
      }
      catch (e) {
        throw new SyntaxError(
          `AppSearchEngine: parseQueryToAction: Error parsing query to action: \n${e as string}`,
        );
      }
    }
  }
}

new Search.Search()
  .run();
Script.complete();

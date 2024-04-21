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
    SearchOutput,
    SearchSettings
  > {
    public runtime(): Nullable<SearchOutput> {
      try {
        const {
          app,
          user,
        }: SearchSettings = this.setting.unmerged;

        const TAG: string = app.tag;

        if (TAG === "")
          throw new SyntaxError(
            `setting.app.tag is empty`,
          );
        const MATH: string[] = app.math ?? [];

        const input: string = this.inputData?.input ?? "";

        const query: Query = new Query(
          input === ""
            ? this.read()
            : input,
          this.inputData?.clip ?? "",
          MATH,
        );

        const match: Nullable<SearchEngineSetting> = user
          .engines
          .find(
            eng => eng.keys.includes(
              query.key,
            ),
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
                  match.keys,
                  match.app,
                );

        if (resolved)
          this.write(
            query.clean,
          );

        return resolved
          ?.parseQueryToAction(
            query,
          ) ?? null;
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
    public readonly key: string;
    public readonly terms: string[];

    constructor(
      query: string,
      clip: string,
      math: string[] = [],
    ) {
      try {
        const tokens: string[] = [
          ...Query.mathefy(
            Query.tokenize(query),
            math,
          ),
        ];

        if (tokens.length === 1)
          tokens
            .push(
              ...Query.tokenize(clip),
            );

        let _key: string = tokens
          .shift()
          ?.toLowerCase() ?? "";

        if (_key.endsWith(".")) {
          if (_key.length > 1)
            _key = _key.slice(0, -1);
          else if (tokens.length > 0)
            throw new SyntaxError(
              `Query '${query}' resolved to\ninvalid key '${_key}'\nwith terms: '${tokens.join("|")}'`,
            );
          else
            throw new SyntaxError(
              `Query '${query}' resolved to\ninvalid key '${_key}'\nwith zero terms.`,
            );
        }
        else if (_key === "") {
          if (tokens.length < 1)
            throw new SyntaxError(
              `Query resolved empty`,
            );
          else
            throw new RangeError(
              `Unexpected: final query has no key\nbut has terms: '${tokens.join("|")}'`,
            );
        }

        this.key = _key;
        this.terms = [...tokens];
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

    public get clean(): string {
      try {
        return [
          this.key,
          this.natural,
        ]
          .join(" ");
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
    ): string[] {
      try {
        return query
          .trim()
          .split(" ");
      }
      catch (e) {
        throw new EvalError(
          `Query: tokenize`,
          { cause: e },
        );
      }
    }

    private static mathefy(
      tokens: string[],
      math: string[],
    ): string[] {
      try {
        const T: string[] = [...tokens];
        const M: string[] = math
          .filter(
            mk => mk !== "",
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
                "@",
                "#",
                "$",
                "°",
              ];

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
          `Query: mathefy`,
          { cause: e },
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
          `Engine: ctor`,
          { cause: e },
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

        if (this.url.length === 0)
          throw new SyntaxError(
            `engine url[] is empty`,
          );
        else if (this.url.every(u => u === ""))
          throw new SyntaxError(
            `engine url[""] contains all empty strings`,
          );
      }
      catch (e) {
        throw new EvalError(
          `BrowserEngine: ctor`,
          { cause: e },
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
          app: "safari",
          actions: actions,
          natural: query.natural,
          browser: this.browser,
        };
      }
      catch (e) {
        throw new EvalError(
          `BrowserEngine: parseQueryToAction`,
          { cause: e },
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
        if (this.app === "")
          throw new SyntaxError(
            `engine app name is empty`,
          );
      }
      catch (e) {
        throw new EvalError(
          `AppEngine: ctor`,
          { cause: e },
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        return {
          app: this.app,
          actions: query.natural,
        };
      }
      catch (e) {
        throw new EvalError(
          `AppEngine: parseQueryToAction`,
          { cause: e },
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
        if (this.native === "")
          throw new SyntaxError(
            `engine native provider is empty`,
          );
      }
      catch (e) {
        throw new EvalError(
          `NativeEngine: ctor`,
          { cause: e },
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        return {
          app: "native",
          actions: query.natural,
          "native": this.native,
        };
      }
      catch (e) {
        throw new EvalError(
          `NativeEngine: parseQueryToAction`,
          { cause: e },
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
        if (this.shortcut === "")
          throw new SyntaxError(
            `engine shortcut name is empty`,
          );
      }
      catch (e) {
        throw new EvalError(
          `ShortcutEngine: ctor`,
          { cause: e },
        );
      }
    }

    public parseQueryToAction(query: Query): SearchOutput {
      try {
        return {
          app: "shortcut",
          actions: query.natural,
          shortcut: this.shortcut,
          output: this.output,
        };
      }
      catch (e) {
        throw new EvalError(
          `ShortcutEngine: parseQueryToAction`,
          { cause: e },
        );
      }
    }
  }
}

new Search.Search()
  .run();

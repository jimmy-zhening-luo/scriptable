class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];

  constructor(
    query: string,
    CHAT: stringful,
    TRANSLATE: stringful,
    MATH: stringful[] = [],
  ) {
    try {
      const tokens: stringful[] = [
        ...Query.mathefy(
          Query.transliterate(
            Query.tokenize(
              query,
              CHAT,
            ),
            TRANSLATE,
          ),
          MATH,
        ),
      ];

      if (tokens.length === 0)
        throw new SyntaxError(
          `Query resolved to 0 tokens`,
          { cause: { query } },
        );
      else {
        this.key = String(
          tokens.shift(),
        )
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
      return `${this.key} ${this.natural}` as stringful;
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
            (t: string): t is stringful =>
              t.length !== 0,
          ),
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
        const t_0: stringful = String(
          tokens[0],
        )
          .toLowerCase() as stringful;
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
                    String(
                      tokens
                        .shift(),
                    )
                      .slice(TRANSLATE.length) as stringful,
                  ]
                : t_0.length > TRANSLATE.length
                  ? [
                      TRANSLATE,
                      `${LANG}${t_0[TRANSLATE.length]}` as stringful,
                      ...String(tokens.shift()).length > TRANSLATE.length + LANG.length
                        ? [
                            t_0.slice(
                              TRANSLATE.length + LANG.length,
                            ) as stringful,
                          ]
                        : [],
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
            (mk: stringful): boolean =>
              mk.length <= t_0_len,
          )
          .sort(
            (a: stringful, b: stringful): number =>
              b.length - a.length,
          )
          .find(
            (mk: stringful): boolean =>
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
              (a: stringful, b: stringful): number =>
                a.length - b.length,
            )
            .shift() ?? null;

          if (math_short !== null) {
            const numeric: stringful[] = [
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

            if (numeric.includes(t_0[0] as stringful))
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

module.exports = Query;

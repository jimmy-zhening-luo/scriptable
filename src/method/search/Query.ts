class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];
  private readonly numeric: stringful[] = [
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
  ] as stringful[];

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
          CHAT,
          TRANSLATE,
          this.numeric,
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
    CHAT: stringful,
  ): [stringful, ...stringful[]] {
    try {
      const preprocessed: stringful[] = query.startsWith(" ")
        ? [CHAT]
        : [];
      const tokenized: stringful[] = [
        ...preprocessed,
        ...query
          .trim()
          .split(" ")
          .filter(
            (t: string): t is stringful =>
              t.length > 0,
          ),
      ];

      if (tokenized.length < 1)
        throw new SyntaxError(
          `query contains 0 tokens`,
        );
      else
        return tokenized as [stringful, ...stringful[]]
    }
    catch (e) {
      throw new EvalError(
        `Query: tokenize`,
        { cause: e },
      );
    }
  }

  private static transliterate(
    T: [stringful, ...stringful[]],
    TRANSLATE: stringful,
  ): stringful[] {
    try {
      const LANG: stringful = "@" as stringful;
      const t0: stringful = T[0]
        .toLowerCase() as stringful;
      const pre: stringful[] = t0.length > 1
        ? t0.startsWith(LANG)
          ? [TRANSLATE]
          : t0.startsWith(TRANSLATE)
            ? t0.slice(
              TRANSLATE.length,
              TRANSLATE.length + LANG.length,
            ) === LANG
              ? [
                  TRANSLATE,
                  String(
                    T
                      .shift(),
                  )
                    .slice(TRANSLATE.length) as stringful,
                ]
              : t0.length > TRANSLATE.length
                ? [
                    TRANSLATE,
                    `${LANG}${t0[TRANSLATE.length]}` as stringful,
                    ...String(T.shift()).length > TRANSLATE.length + LANG.length
                      ? [
                          t0.slice(
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
        ...T,
      ] as [stringful, ...stringful[]];
    }
    catch (e) {
      throw new EvalError(
        `Query: transliterate`,
        { cause: e },
      );
    }
  }

  private static mathefy(
    T: [stringful, ...stringful[]],
    M: stringful[],
    CHAT: stringful,
    TRANSLATE: stringful,
    numeric: stringful[],
  ): [stringful, ...stringful[]] {
    try {
      M.push(
        CHAT,
        TRANSLATE,
      );

      const t0: stringful = T[0].toLowerCase() as stringful;
      const t0_len: number = t0.length;
      const math_long: Nullable<stringful> = [...M]
        .filter(
          (mk: stringful): boolean =>
            mk.length <= t0_len,
        )
        .sort(
          (a: stringful, b: stringful): number =>
            b.length - a.length,
        )
        .find(
          (mk: stringful): boolean =>
            t0.startsWith(mk),
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

        if (math_short !== null && numeric.includes(t0[0] as stringful))
          T.unshift(math_short);
      }

      return T as [stringful, ...stringful[]];
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

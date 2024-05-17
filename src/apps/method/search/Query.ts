class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];
  private readonly NUMERIC: stringful[] = [
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
    MATH_SHORT: stringful,
    MATH_LONG: stringful,
  ) {
    try {
      const [
        K,
        ...terms
      ]: Arrayful<stringful> = this.mathefy(
        this.dedot(
          this.transliterate(
            this.tokenize(
              query,
              CHAT,
              TRANSLATE,
              MATH_SHORT,
            ),
            TRANSLATE,
          ),
        ),
        CHAT,
        TRANSLATE,
        MATH_SHORT,
        MATH_LONG,
        this.NUMERIC,
      );

      this.key = K.toLowerCase() as stringful;
      this.terms = terms;
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
      const [
        key,
        natural,
      ]: [stringful, string] = [
        this.key,
        this.natural,
      ];

      return `${key} ${natural}` as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Query: clean`,
        { cause: e },
      );
    }
  }

  private tokenize(
    query: string,
    CHAT: stringful,
    TRANSLATE: stringful,
    MATH_SHORT: stringful,
  ): Arrayful<stringful> {
    try {
      const preprocessed: stringful[] = query.startsWith(" ")
        ? query.startsWith("  ")
          ? query.startsWith("   ")
            ? [TRANSLATE]
            : [CHAT]
          : [MATH_SHORT]
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
        return tokenized as Arrayful<stringful>;
    }
    catch (e) {
      throw new EvalError(
        `Query: tokenize`,
        { cause: e },
      );
    }
  }

  private transliterate(
    T: Arrayful<stringful>,
    TRANSLATE: stringful,
  ): Arrayful<stringful> {
    try {
      const LANG_TAG: stringful = "@" as stringful;
      const T0: stringful = T[0];
      const t0: stringful = T0.toLowerCase() as stringful;
      const pre: stringful[] = t0.startsWith(LANG_TAG)
        ? [TRANSLATE]
        : t0.startsWith(TRANSLATE)
          ? t0.slice(
            TRANSLATE.length,
            TRANSLATE.length + LANG_TAG.length,
          ) === LANG_TAG
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
                  `${LANG_TAG}${t0[TRANSLATE.length]}` as stringful,
                  ...String(T.shift()).length > TRANSLATE.length + LANG_TAG.length
                    ? [
                        t0.slice(
                          TRANSLATE.length + LANG_TAG.length,
                        ) as stringful,
                      ]
                    : [],
                ]
              : []
          : [];

      T.unshift(...pre);

      return T;
    }
    catch (e) {
      throw new EvalError(
        `Query: transliterate`,
        { cause: e },
      );
    }
  }

  private dedot(
    T: Arrayful<stringful>,
  ): Arrayful<stringful> {
    try {
      const T0_Dedot: Null<stringful> = T[0].endsWith(".")
        && !T[0].startsWith(".")
        ? T[0]
          .slice(
            0,
            -1,
          ) as stringful
        : null;

      if (T0_Dedot !== null) {
        T.shift();
        T.unshift(T0_Dedot);
      }

      return T;
    }
    catch (e) {
      throw new EvalError(
        `Query: dedot`,
        { cause: e },
      );
    }
  }

  private mathefy(
    T: Arrayful<stringful>,
    CHAT: stringful,
    TRANSLATE: stringful,
    MATH_SHORT: stringful,
    MATH_LONG: stringful,
    NUMERIC: stringful[],
  ): Arrayful<stringful> {
    try {
      const M: Fourple<stringful> = [
        MATH_SHORT,
        CHAT,
        TRANSLATE,
        MATH_LONG,
      ];
      const T0: stringful = T[0];
      const t0: stringful = T0.toLowerCase() as stringful;
      const t0_len: number = t0.length;
      const longest: Null<stringful> = [...M]
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

      if (longest === null) {
        if (NUMERIC.includes(t0[0] as stringful))
          T.unshift(MATH_SHORT);
      }
      else {
        const operand_0: string = T
          .shift()
          ?.slice(longest.length) ?? "";

        if (operand_0.length > 0)
          T.unshift(operand_0 as stringful);

        T.unshift(longest);
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

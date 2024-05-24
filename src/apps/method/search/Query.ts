class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];
  private readonly NUMERIC = [
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
    ONE: stringful,
    TWO: stringful,
    THREE: stringful,
  ) {
    try {
      const [
        key,
        ...terms
      ] =
        this
          .mathefy(
            this
              .dedot(
                this
                  .transliterate(
                    this
                      .tokenize(
                        query,
                        ONE,
                        TWO,
                        THREE,
                      ),
                    TRANSLATE,
                  ),
              ),
            CHAT,
            TRANSLATE,
            MATH_SHORT,
            MATH_LONG,
          );

      this.terms = terms;
      this.key = key
        .toLowerCase() as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Query: ctor`,
        { cause: e },
      );
    }
  }

  public get natural() {
    try {
      return this
        .terms
        .join(
          " ",
        );
    }
    catch (e) {
      throw new EvalError(
        `Query: clean`,
        { cause: e },
      );
    }
  }

  public get clean() {
    try {
      return `${
        this
          .key
      } ${
        this
          .natural
      }` as stringful;
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
    ONE: stringful,
    TWO: stringful,
    THREE: stringful,
  ) {
    try {
      const preprocessed = query
        .startsWith(
          " ",
        )
        ? query
          .startsWith(
            "  ",
          )
          ? query
            .startsWith(
              "   ",
            )
            ? [THREE]
            : [TWO]
          : [ONE]
        : [];
      const tokenized: stringful[] = [
        ...preprocessed,
        ...query
          .trim()
          .split(
            " ",
          )
          .filter(
            (t): t is stringful =>
              t
                .length > 0,
          ),
      ];

      if (
        tokenized
          .length < 1
      )
        throw new SyntaxError(
          `query has 0 tokens`,
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
  ) {
    try {
      const LANG_TAG = "@" as stringful;
      const [T0] = T;
      const t0 = T0
        .toLowerCase() as stringful;
      const pre =
        t0
          .startsWith(
            LANG_TAG,
          )
          ? [TRANSLATE]
          : t0
            .startsWith(
              TRANSLATE,
            )
            ? t0
              .slice(
                TRANSLATE.length,
                TRANSLATE.length + LANG_TAG.length,
              ) === LANG_TAG
              ? [
                  TRANSLATE,
                  String(
                    T
                      .shift(),
                  )
                    .slice(
                      TRANSLATE
                        .length,
                    ) as stringful,
                ]
              : t0.length > TRANSLATE.length
                ? [
                    TRANSLATE,
                    `${
                      LANG_TAG
                    }${
                      t0[
                        TRANSLATE
                          .length
                      ]
                    }` as stringful,
                    ...TRANSLATE.length + LANG_TAG.length < String(
                      T
                        .shift(),
                    ).length
                      ? [
                          t0
                            .slice(
                              TRANSLATE.length + LANG_TAG.length,
                            ) as stringful,
                        ]
                      : [],
                  ]
                : []
            : [];

      T
        .unshift(
          ...pre,
        );

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
  ) {
    try {
      const [T0] = T;
      const T0_Dedot =
        T0.endsWith(
          ".",
        )
        && !T0.startsWith(
          ".",
        )
          ? T0
            .slice(
              0,
              -1,
            ) as stringful
          : null;

      if (T0_Dedot !== null) {
        T
          .shift();
        T
          .unshift(
            T0_Dedot,
          );
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
  ) {
    try {
      const M = [
        MATH_SHORT,
        CHAT,
        TRANSLATE,
        MATH_LONG,
      ] as const;
      const [T0] = T;
      const t0 = T0
        .toLowerCase() as stringful;
      const t0_len = t0.length;
      const longest = [...M]
        .filter(
          mk =>
            t0_len >= mk
              .length,
        )
        .sort(
          (a, b) =>
            b.length - a.length,
        )
        .find(
          mk =>
            t0
              .startsWith(
                mk,
              ),
        ) ?? null;

      if (longest === null) {
        if (
          this
            .NUMERIC
            .includes(
              t0[0],
            )
        )
          T
            .unshift(
              MATH_SHORT,
            );
      }
      else {
        const operand_0 = T
          .shift()
          ?.slice(
            longest
              .length,
          ) ?? "";

        if (
          operand_0
            .length > 0
        )
          T
            .unshift(
              operand_0 as stringful,
            );

        T
          .unshift(
            longest,
          );
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

class Query {
  public readonly terms: stringful[];
  protected _key: stringful;
  protected _locked: boolean = false;
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
    ".",
    "!",
    ",",
    ":",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "<",
    ">",
    "=",
    "+",
    "-",
    "*",
    "/",
    "^",
    "%",
    "~",
    "|",
    "&",
    "#",
    "$",
  ];

  constructor(
    query: string,
    CHAT: stringful,
    TRANSLATE: stringful,
    MATH_SHORT: stringful,
    MATH_LONG: stringful,
    ONE: stringful,
    TWO: stringful,
    THREE: stringful,
    private readonly REST: stringful,
  ) {
    try {
      const [
        key,
        ...terms
      ] = Query.mathefy(
        Query.dedot(
          Query.transliterate(
            Query.tokenize(
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
        this.NUMERIC,
      );

      this
        .terms = terms;
      this
        ._key = Query
          .toLower(
            key,
          );
    }
    catch (e) {
      throw new EvalError(
        `Query: ctor`,
        { cause: e },
      );
    }
  }

  public get key() {
    return this._key;
  }

  public get locked() {
    return this._locked;
  }

  public get string() {
    try {
      const string = [
        this.key,
        this.natural,
      ] as const;

      return string.join(" ") as Join<
        typeof string,
        " "
      >;
    }
    catch (e) {
      throw new EvalError(
        `Query: string`,
        { cause: e },
      );
    }
  }

  public get natural() {
    try {
      return this
        .terms
        .join(" ");
    }
    catch (e) {
      throw new EvalError(
        `Query: natural`,
        { cause: e },
      );
    }
  }

  private static tokenize(
    query: string,
    ONE: stringful,
    TWO: stringful,
    THREE: stringful,
  ) {
    try {
      const preprocessed = query.startsWith(" ")
        ? query.startsWith("  ")
          ? query.startsWith("   ")
            ? [THREE]
            : [TWO]
          : [ONE]
        : [];
      const tokens = [
        ...preprocessed,
        ...query
          .trim()
          .split(" ")
          .filter(
            (token): token is stringful =>
              token.length > 0,
          ),
      ];

      if (tokens.length > 0)
        return tokens as Arrayful<stringful>;
      else
        throw new SyntaxError(
          `no tokens in query`,
          { cause: String(query) },
        );
    }
    catch (e) {
      throw new EvalError(
        `Query: tokenize`,
        { cause: e },
      );
    }
  }

  private static transliterate(
    tokens: Arrayful<stringful>,
    TRANSLATE: stringful,
  ) {
    try {
      const LANG_TAG = "@" as stringful;
      const [T0] = tokens;
      const t0 = Query.toLower(T0);
      const pre = t0.startsWith(LANG_TAG)
        ? [TRANSLATE]
        : t0.startsWith(TRANSLATE)
          ? LANG_TAG === t0.slice(
            TRANSLATE.length,
            TRANSLATE.length + LANG_TAG.length,
          )
            ? [
                TRANSLATE,
                String(tokens.shift())
                  .slice(TRANSLATE.length) as stringful,
              ]
            : TRANSLATE.length > t0.length
              ? [
                  TRANSLATE,
                  [
                    LANG_TAG,
                    t0[TRANSLATE.length],
                  ]
                    .join("") as Join<Dyad<stringful>>,
                  ...TRANSLATE.length + LANG_TAG.length < String(tokens.shift()).length
                    ? [
                        t0.slice(
                          TRANSLATE.length + LANG_TAG.length,
                        ) as stringful,
                      ]
                    : [],
                ]
              : []
          : [];

      tokens.unshift(...pre);

      return tokens;
    }
    catch (e) {
      throw new EvalError(
        `Query: transliterate`,
        { cause: e },
      );
    }
  }

  private static dedot(tokens: Arrayful<stringful>) {
    try {
      const [T0] = tokens;
      const T0_Dedot = T0.endsWith(".") && !T0.startsWith(".")
        ? T0.slice(
          0,
          -1,
        ) as stringful
        : null;

      if (T0_Dedot !== null) {
        tokens.shift();
        tokens.unshift(T0_Dedot);
      }

      return tokens;
    }
    catch (e) {
      throw new EvalError(
        `Query: dedot`,
        { cause: e },
      );
    }
  }

  private static mathefy(
    tokens: Arrayful<stringful>,
    CHAT: stringful,
    TRANSLATE: stringful,
    MATH_SHORT: stringful,
    MATH_LONG: stringful,
    NUMERIC: readonly string[],
  ) {
    try {
      const M = [
        MATH_SHORT,
        CHAT,
        TRANSLATE,
        MATH_LONG,
      ] as const;
      const [T0] = tokens;
      const t0 = Query.toLower(T0);
      const t0_len = t0.length;
      const longest = [...M]
        .filter(
          mk =>
            t0_len >= mk.length,
        )
        .sort(
          (a, b) =>
            b.length - a.length,
        )
        .find(
          mk =>
            t0.startsWith(mk),
        )
        ?? null;

      if (longest === null) {
        if (NUMERIC.includes(t0[0]))
          tokens.unshift(MATH_SHORT);
      }
      else {
        const operand_0 = tokens
          .shift()
          ?.slice(longest.length)
          ?? "";

        if (operand_0.length > 0)
          tokens.unshift(operand_0 as stringful);

        tokens.unshift(longest);
      }

      return tokens;
    }
    catch (e) {
      throw new EvalError(
        `Query: mathefy`,
        { cause: e },
      );
    }
  }

  private static toLower(stringful: stringful) {
    try {
      return stringful.toLowerCase() as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Query: toLower`,
        { cause: e },
      );
    }
  }

  public lock(key: Null<stringful>) {
    try {
      if (key !== null)
        this._key = key;
      else {
        this
          .terms
          .unshift(this.key);
        this._key = this.REST;
      }

      this._locked = true;
    }
    catch (e) {
      throw new EvalError(
        `Query: lock`,
        { cause: e },
      );
    }
  }

  public toString() {
    return this.string;
  }
}

module.exports = Query;

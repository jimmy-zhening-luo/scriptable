class Query {
  public readonly terms: stringful[];
  protected _key: stringful;
  protected _locked = false;
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
      const [key, ...terms] = Query.mathefy(
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

      this.terms = terms;
      this._key = Query.toLower(key);
    }
    catch (e) {
      throw new Error(
        `Query`,
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

  public get natural() {
    return this.terms.join(" ");
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
        : [],
      tokens = [
        ...preprocessed,
        ...query
          .trim()
          .split(" ")
          .filter((token): token is stringful => token.length > 0),
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
      throw new Error(
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
      const LANG_TAG = "@" as stringful,
      [T0] = tokens,
      t0 = Query.toLower(T0),
      pre = t0.startsWith(LANG_TAG)
        ? [TRANSLATE]
        : t0.startsWith(TRANSLATE)
          ? LANG_TAG === t0
            .slice(
              TRANSLATE.length,
              TRANSLATE.length + LANG_TAG.length,
            )
            ? [TRANSLATE, tokens.shift()?.slice(TRANSLATE.length) as stringful]
            : TRANSLATE.length > t0.length
              ? [
                  TRANSLATE,
                  ([LANG_TAG, t0[TRANSLATE.length] as string] satisfies [stringful, string]).join("") as stringful,
                  ...TRANSLATE.length + LANG_TAG.length < (tokens.shift()?.length ?? 0)
                    ? [t0.slice(TRANSLATE.length + LANG_TAG.length) as stringful]
                    : [],
                ]
              : []
          : [];

      tokens.unshift(...pre);

      return tokens;
    }
    catch (e) {
      throw new Error(
        `Query: transliterate`,
        { cause: e },
      );
    }
  }

  private static dedot(tokens: Arrayful<stringful>) {
    try {
      const [T0] = tokens,
      T0_Dedot = T0.endsWith(".") && !T0.startsWith(".")
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
      throw new Error(
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
      ] as const,
      [T0] = tokens,
      t0 = Query.toLower(T0),
      t0_len = t0.length,
      longest = [...M]
        .filter(mk => t0_len >= mk.length)
        .sort((a, b) => b.length - a.length)
        .find(mk => t0.startsWith(mk))
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
      throw new Error(
        `Query: mathefy`,
        { cause: e },
      );
    }
  }

  private static toLower(stringful: stringful) {
    return stringful.toLowerCase() as stringful;
  }

  public lock(key: Null<stringful>) {
    try {
      if (key !== null)
        this._key = key;
      else {
        this.terms.unshift(this.key);
        this._key = this.REST;
      }

      this._locked = true;
    }
    catch (e) {
      throw new Error(
        `Query: lock`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      const { key, natural } = this,
      predicates = [key, natural] as const satisfies Tuple<string>,
      separator = " " satisfies literalful<" ">;

      return predicates.join(separator) as stringful;
    }
    catch (e) {
      throw new TypeError(
        `Query: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = Query;

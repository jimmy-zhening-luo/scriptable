class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];

  constructor(
    input: string,
    engines: SearchSetting["user"]["engines"],
    alias: FieldTable,
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
      const [K, ...T] = Query.mathefy(
        Query.dedot(
          Query.transliterate(
            Query.tokenize(
              input,
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
        [
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
          "(",
          ")",
          "<",
          ">",
          "+",
          "-",
          "%",
          "~",
          "#",
          "$",
        ],
      );

      this.terms = T;

      const key = (K satisfies stringful).toLowerCase() as stringful;

      if (key in engines)
        this.key = key;
      else
        if ((alias[key] as stringful) in engines)
          this.key = alias[key] as stringful;
        else {
          this.terms.unshift(key);
          this.key = this.REST;
        }
    }
    catch (e) {
      throw new Error(`Query`, { cause: e });
    }
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

    if (tokens.length < 1)
      throw new SyntaxError(`no tokens in query`, { cause: query });
    else
      return tokens as Arrayful<stringful>;
  }

  private static transliterate(tokens: Arrayful<stringful>, TRANSLATE: stringful) {
    const LANG_TAG = "@" as stringful,
    [T0] = tokens,
    t0 = (T0 satisfies stringful).toLowerCase() as stringful,
    pre = t0.startsWith(LANG_TAG)
      ? [TRANSLATE]
      : t0.startsWith(TRANSLATE)
        ? LANG_TAG === t0
          .slice(TRANSLATE.length, TRANSLATE.length + LANG_TAG.length)
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

  private static dedot(tokens: Arrayful<stringful>) {
    const [T0] = tokens,
    dedot0 = T0.endsWith(".") && !T0.startsWith(".") ? T0.slice(0, -1) as stringful : null;

    if (dedot0 !== null) {
      tokens.shift();
      tokens.unshift(dedot0);
    }

    return tokens;
  }

  private static mathefy(
    tokens: Arrayful<stringful>,
    CHAT: stringful,
    TRANSLATE: stringful,
    MATH_SHORT: stringful,
    MATH_LONG: stringful,
    NUMERIC: readonly string[],
  ) {
    const M = [
      MATH_SHORT,
      CHAT,
      TRANSLATE,
      MATH_LONG,
    ] as const,
    [T0] = tokens,
    t0 = (T0 satisfies stringful).toLowerCase() as stringful,
    len0 = t0.length,
    longest = [...M]
      .filter(mk => len0 >= mk.length)
      .sort((a, b) => b.length - a.length)
      .find(mk => t0.startsWith(mk)) ?? null;

    if (longest === null) {
      if (NUMERIC.includes(t0[0]))
        tokens.unshift(MATH_SHORT);
    }
    else {
      const operand_0 = tokens.shift()?.slice(longest.length) ?? "";

      if (operand_0.length > 0)
        tokens.unshift(operand_0 as stringful);

      tokens.unshift(longest);
    }

    return tokens;
  }

  public toString() {
    const { key, natural } = this,
    predicates = [key, natural] as const satisfies Tuple<string>,
    separator = " " satisfies literalful<" ">;

    return predicates.join(separator) as stringful;
  }
}

module.exports = Query;
export type { Query };

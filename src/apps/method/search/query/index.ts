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
        Query.undot(
          Query.translator(
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
    const implicit = query.startsWith(" ")
      ? query.charAt(1) === " "
        ? query.charAt(2) === " "
          ? [THREE]
          : [TWO]
        : [ONE]
      : [],
    tokens = [
      ...implicit,
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

  private static translator(tokens: Arrayful<stringful>, TRANSLATE: stringful) {
    const LANGUAGE = "@" as stringful,
    [T0] = tokens,
    t0 = (T0 satisfies stringful).toLowerCase() as stringful,
    language = t0.startsWith(LANGUAGE)
      ? [TRANSLATE]
      : t0.startsWith(TRANSLATE)
        ? LANGUAGE === t0.slice(TRANSLATE.length, TRANSLATE.length + LANGUAGE.length)
          ? [TRANSLATE, tokens.shift()?.slice(TRANSLATE.length) as stringful]
          : TRANSLATE.length > t0.length
            ? [
                TRANSLATE,
                ([LANGUAGE, t0[TRANSLATE.length] as string] satisfies [stringful, string]).join("") as stringful,
                ...TRANSLATE.length + LANGUAGE.length < (tokens.shift()?.length ?? 0)
                  ? [t0.slice(TRANSLATE.length + LANGUAGE.length) as stringful]
                  : [],
              ]
            : []
        : [];

    tokens.unshift(...language);

    return tokens;
  }

  private static undot(tokens: Arrayful<stringful>) {
    const [T0] = tokens,
    dedot0 = !T0.startsWith(".") && T0.endsWith(".")
      ? T0.slice(0, -1) as stringful
      : null;

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
    const [T0] = tokens,
    t0 = (T0 satisfies stringful).toLowerCase() as stringful,
    longest = [
      MATH_SHORT,
      CHAT,
      TRANSLATE,
      MATH_LONG,
    ]
      .filter(math => t0.length >= math.length)
      .sort((a, b) => b.length - a.length)
      .find(math => t0.startsWith(math))
      ?? null;

    if (longest === null) {
      if (NUMERIC.includes(t0[0]))
        tokens.unshift(MATH_SHORT);
    }
    else {
      const operand = tokens.shift()?.slice(longest.length) ?? "";

      if (operand.length > 0)
        tokens.unshift(operand as stringful);

      tokens.unshift(longest);
    }

    return tokens;
  }

  public toString() {
    const { key, natural } = this;

    return `${key satisfies stringful} ${natural}` as stringful;
  }
}

module.exports = Query;
export type { Query };

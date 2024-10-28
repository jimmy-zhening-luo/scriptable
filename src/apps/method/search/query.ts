class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];
  public readonly engine: SearchSetting["engines"][string];

  constructor(
    input: string,
    engines: SearchSetting["engines"],
    alias: FieldTable,
    SELECTOR: stringful,
    OP: stringful,
    MATH: stringful,
    TRANSLATE: stringful,
    ONE: stringful,
    TWO: stringful,
    REST: stringful,
  ) {
    try {
      const [K, ...terms] = Query.parse(
        Query.tokenize(
          input,
          ONE,
          TWO,
          REST,
        ),
        SELECTOR,
        OP,
        MATH,
        TRANSLATE,
      ),
      key = (K satisfies stringful).toLowerCase() as stringful;

      this.terms = terms;

      if (key in engines)
        this.key = key;
      else if (key in alias && (alias[key] as stringful) in engines)
        this.key = alias[key] as stringful;
      else {
        this.key = REST;
        this.terms.unshift(key);
      }

      this.engine = engines[this.key] as typeof engines[string];
    }
    catch (e) {
      throw new Error(`Query: [${input}]`, { cause: e });
    }
  }

  public get natural() {
    return this.terms.join(" ");
  }

  private static tokenize(
    input: string,
    ONE: stringful,
    TWO: stringful,
    REST: stringful,
  ) {
    const tokens = [
      ...input.startsWith(" ")
        ? input.charAt(1) === " "
          ? input.charAt(2) === " "
            ? [REST]
            : [TWO]
          : [ONE]
        : [],
      ...input.split(" ").filter((token): token is stringful => token.length > 0),
    ];

    if (tokens.length < 1)
      throw new SyntaxError(`Input query has no tokens`);

    return tokens as Arrayful<stringful>;
  }

  private static parse(
    tokens: Arrayful<stringful>,
    SELECTOR: stringful,
    OP: stringful,
    MATH: stringful,
    TRANSLATE: stringful,
  ) {
    function select(
      TRANSLATE: stringful,
      SELECTOR: stringful,
      DOT: stringful,
      token: stringful,
      rest: stringful[],
    ) {
      const s = token.indexOf(SELECTOR),
      d = token.indexOf(DOT),
      { x, i } = d < 0 || d > s
        ? { x: SELECTOR, i: s }
        : { x: DOT, i: d };

      if (i > 0) {
        const [key, ...tx] = token.split(x) as unknown as readonly [stringful, ...string[]],
        { selection, tokens = rest } = tx.length > 0
          ? { selection: tx.join(x) }
          : {
              selection: rest[0] ?? "",
              tokens: rest.slice(1),
            };

        return [key, `${x}${selection}` as stringful, ...tokens] as const;
      }
      else
        return [
          ...i < 0 ? [] as const : [TRANSLATE] as const,
          token0,
          ...rest,
        ] as const;
    }

    const [token0, ...rest] = tokens,
    DOT = "." as stringful,
    isNum = (char = null, operators = "") => char === null || !Number.isNaN(Number(char)) || operators.includes(char);

    if ([OP, SELECTOR].some(string => string.includes(DOT)))
      throw new TypeError("Selector and operators must not include reserved char `.`");
    else if (isNum(SELECTOR[0], OP))
      throw new SyntaxError("Selector must not begin with digit/operator");

    return isNum(token0[0], OP) || token0.startsWith(".") && isNum(token0[1])
      ? [MATH, ...tokens] as const
      : select(
        TRANSLATE,
        SELECTOR,
        DOT,
        token0,
        rest,
      );
  }

  public toString() {
    return `${this.key satisfies stringful} ${this.natural}` as stringful;
  }
}

module.exports = Query;
export type { Query };

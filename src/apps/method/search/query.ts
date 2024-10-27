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
      SELECTOR: stringful,
      DOT: stringful,
      token: stringful,
      rest: stringful[],
    ) {
      const s = token.indexOf(SELECTOR),
      d = token.indexOf(DOT),
      x = d < 0 || d > s ? SELECTOR : DOT,
      [key, ...tx] = token.split(x) as unknown as readonly [stringful, ...string[]],
      { selection, tokens = rest } = tx.length > 0
        ? { selection: tx.join(x) }
        : {
            selection: rest[0] ?? "",
            tokens: rest.slice(1) as stringful[],
          };

      return [key, `${x}${selection}` as stringful, ...tokens] as const;
    }

    const [token0, ...rest] = tokens,
    DIGIT = "0123456789",
    DIGITOP = `${DIGIT}${OP}`,
    DOT = "." as stringful,
    X = [SELECTOR, DOT] as const;

    if (SELECTOR.includes(DOT) || DIGITOP.includes(SELECTOR[0]))
      throw new SyntaxError("Selector must neither contain dot nor begin with digit/operator.");

    return DIGITOP.includes(token0[0]) || token0[0] === "." && token0.length > 1 && DIGIT.includes(token0[1] as unknown as stringful)
      ? [MATH, ...tokens] as const
      : !X.some(x => token0.includes(x))
        ? tokens
        : X.some(x => token0.startsWith(x))
          ? [TRANSLATE, ...tokens] as const
          : select(
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

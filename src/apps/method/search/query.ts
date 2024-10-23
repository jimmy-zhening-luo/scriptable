class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];
  public readonly engine: SearchSetting["engines"][string];

  constructor(
    input: string,
    engines: SearchSetting["engines"],
    alias: FieldTable,
    SELECTOR: stringful,
    TRANSLATE: stringful,
    MATH: stringful,
    ONE: stringful,
    TWO: stringful,
    REST: stringful,
  ) {
    try {
      const [K, ...terms] = Query.undot(
        Query.translate(
          Query.mathefy(
            Query.tokenize(
              input,
              ONE,
              TWO,
              REST,
            ),
            MATH,
          ),
          SELECTOR,
          TRANSLATE,
        ),
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
    const implied = input.startsWith(" ")
      ? input.charAt(1) === " "
        ? input.charAt(2) === " "
          ? [REST]
          : [TWO]
        : [ONE]
      : [],
    tokens = [
      ...implied,
      ...input
        .trim()
        .split(" ")
        .filter((token): token is stringful => token.length > 0),
    ];

    if (tokens.length > 0)
      return tokens as Arrayful<stringful>;
    else
      throw new SyntaxError(`Input query has no tokens`);
  }

  private static mathefy(
    tokens: Arrayful<stringful>,
    MATH: stringful,
  ) {
    const [token0] = tokens;

    if (!Number.isNaN(Number(`${token0[0]}0`)))
      tokens.unshift(MATH);

    return tokens;
  }

  private static translate(
    tokens: Arrayful<stringful>,
    SELECTOR: stringful,
    TRANSLATE: stringful,
  ) {
    const [token0] = tokens;

    if (token0.startsWith(SELECTOR))
      tokens.unshift(TRANSLATE);

    return tokens;
  }

  private static undot(tokens: Arrayful<stringful>) {
    const [token0] = tokens,
    token_ = !token0.startsWith(".") && token0.endsWith(".")
      ? token0.slice(0, -1) as stringful
      : null;

    if (token_ !== null) {
      tokens.shift();
      tokens.unshift(token_);
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

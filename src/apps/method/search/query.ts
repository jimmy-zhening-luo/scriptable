class Query {
  public readonly key: stringful;
  public readonly terms: stringful[];
  public readonly engine: SearchSetting["engines"][string];

  constructor(
    input: string,
    engines: SearchSetting["engines"],
    alias: FieldTable,
    SELECTOR: stringful,
    OPERATORS: stringful,
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
        OPERATORS,
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
    OPERATORS: stringful,
    MATH: stringful,
    TRANSLATE: stringful,
  ) {
    const [head, ...rest] = tokens,
    isNum = (char?: string, operators = "") => !Number.isNaN(Number(char)) || operators.includes(char as string),
    select = (
      SELECTOR: stringful,
      TRANSLATE: stringful,
      head: stringful,
      rest: stringful[],
    ) => {
      const s = head.indexOf(SELECTOR),
      d = head.indexOf("."),
      { x, i } = d < 0 || (s >= 0 && s < d)
        ? { x: SELECTOR, i: s }
        : { x: ".", i: d };

      if (i < 0)
        return [head, ...rest] as const;
      else {
        const [h, ...hx] = head.split(x) as unknown as readonly [stringful, ...string[]],
        {
          key = h,
          selection = hx.join(x),
          slicer = 0,
        } = h.length > 0
          ? hx.length > 0
            ? {}
            : {
                selection: rest[0] ?? "",
                slicer: 1,
              }
          : { key: TRANSLATE };

        return [key, `${SELECTOR}${selection}` as stringful, ...rest.slice(slicer)] as const;
      }
    };

    return isNum(head[0], OPERATORS) || head.startsWith(".") && isNum(head[1])
      ? [MATH, ...tokens] as const
      : select(SELECTOR, TRANSLATE, head, rest);
  }

  public toString() {
    return `${this.key satisfies stringful} ${this.natural}` as stringful;
  }
}

module.exports = Query;
export type { Query };

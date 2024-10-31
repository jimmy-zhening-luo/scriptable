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
    FALLBACK: Triad<stringful>,
  ) {
    try {
      if (SELECTOR.startsWith("."))
        throw new TypeError("Selector must not begin with `.`")
      else if (OPERATORS.includes("."))
        throw new TypeError("Operators must not include `.`")

      const [Key, ...terms] = Query.select(
        Query.operate(
          Query.tokenize(input, FALLBACK),
          OPERATORS,
          MATH,
        ),
        SELECTOR,
        TRANSLATE,
      ),
      key = (Key satisfies stringful).toLowerCase() as stringful;

      this.terms = terms;

      if (key in engines)
        this.key = key;
      else if (key in alias && (alias[key] as stringful) in engines)
        this.key = alias[key] as stringful;
      else {
        this.key = (FALLBACK satisfies Readonly<Arrayful<stringful>>).at(-1) as stringful;
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
    [F0, F1, Fn]: Triad<stringful>,
  ) {
    const tokens = input.split(" ").filter((token): token is stringful => token.length > 0);

    if (input.startsWith(" "))
      tokens.unshift(
        input.charAt(1) === " "
          ? input.charAt(2) === " "
            ? Fn
            : F1
          : F0,
      );

    if (tokens.length < 1)
      throw new SyntaxError(`Input query has no tokens`);

    return tokens as Arrayful<stringful>;
  }

  private static operate(
    tokens: Arrayful<stringful>,
    OPERATORS: stringful,
    MATH: stringful,
  ) {
    function unroll(head: stringful) {
      const operation = head.match(/(?<key>^:{0}[a-zA-Z]+)(?<operand>:{0}(?:(?:\d)|(?:\-\d))(?:[a-zA-Z\d\-]*$))/);

      return operation === null
        ? [head] as const
        : [
            operation.groups.key as stringful,
            operation.groups.operand as stringful,
          ] as const;
    }
    
    const [head, ...rest] = tokens,
    isNum = (char?: string, operators = "") => !Number.isNaN(Number(char)) || operators.includes(char as string);

    return isNum(head[0], OPERATORS) || head.startsWith(".") && isNum(head[1])
      ? [MATH, ...tokens] as const
      : [...unroll(head), ...rest] as const;
  }

  private static select(
    tokens: Arrayful<stringful>,
    SELECTOR: stringful,
    TRANSLATE: stringful,
  ) {
    const [head, ...rest] = tokens,
    iSelector = head.indexOf(SELECTOR),
    iDot = head.indexOf("."),
    { selector, index } = iDot < 0 || iSelector >= 0 && iSelector < iDot
      ? { selector: SELECTOR, index: iSelector }
      : { selector: ".", index: iDot };

    if (index < 0)
      return tokens;
    else {
      const [pre, ...selected] = head.split(selector) as unknown as readonly [stringful, ...string[]],
      {
        key = pre,
        selection = selected.join(selector),
        restPointer = 0,
      } = pre.length > 0
        ? selected.length > 1 || (selected[0] as string).length > 0
          ? {}
          : {
              selection: rest[0] ?? "",
              restPointer: 1,
            }
        : { key: TRANSLATE };

      return [
        key,
        `${SELECTOR}${selection}` as stringful,
        ...rest.slice(restPointer),
      ] as const;
    }
  }

  public toString() {
    return `${this.key satisfies stringful} ${this.natural}` as stringful;
  }
}

export default Query;

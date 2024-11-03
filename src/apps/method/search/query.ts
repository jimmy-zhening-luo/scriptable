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
    if (`${SELECTOR}${OPERATORS}`.includes("."))
      throw new TypeError("Bad selector/operator");

    const [K, ...terms] = Query.select(
      Query.operate(
        Query.tokenize(
          input,
          FALLBACK,
        ),
        OPERATORS,
        MATH,
      ),
      SELECTOR,
      TRANSLATE,
    ),
    key = (K satisfies stringful).toLowerCase() as stringful;

    ({
      key: this.key = key,
      terms: this.terms = terms,
    } = key in engines
      ? {}
      : key in alias && (alias[key] as string) in engines
        ? { key: alias[key] as stringful }
        : {
            key: (FALLBACK satisfies Readonly<Arrayful<stringful>>).at(-1) as stringful,
            terms: [key, ...terms],
          });
    this.engine = engines[this.key] as typeof engines[string];
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
      throw new RangeError(`Query has no tokens\n[${input}]`);

    return tokens as Arrayful<stringful>;
  }

  private static operate(
    tokens: Readonly<Arrayful<stringful>>,
    OPERATORS: stringful,
    MATH: stringful,
  ) {
    function unroll(head: stringful) {
      const operation = (/(?<key>^:{0}[a-zA-Z]+)(?<operand>:{0}(?:(?:\d)|(?:-\d))(?:[-a-zA-Z\d]*$))/u).exec(head)
        ?.groups;

      return typeof operation === "undefined"
        ? [head] as const
        : [
            operation["key"] as stringful,
            operation["operand"] as stringful,
          ] as const;
    }

    const [head, ...rest] = tokens,
    numeric = (char: char, operators = "") => char >= "0" && char <= "9" || operators.includes(char);

    return numeric(head[0], OPERATORS) || head.length > 1 && head.startsWith(".") && numeric(head[1] as char)
      ? [MATH, ...tokens] as const
      : [...unroll(head), ...rest] as const;
  }

  private static select(
    tokens: Readonly<Arrayful<stringful>>,
    SELECTOR: stringful,
    TRANSLATE: stringful,
  ) {
    const [head, ...rest] = tokens,
    { selector, index } = (([iSelector, iDot]) => iDot < 0 || iSelector >= 0 && iSelector < iDot
      ? { selector: SELECTOR, index: iSelector }
      : { selector: ".", index: iDot })(([SELECTOR, "."] satisfies Dyad).map(s => head.indexOf(s)) satisfies number[] as unknown as Dyad<number>);

    if (index < 0)
      return tokens;
    else {
      const [pre, ...selected] = head.split(selector) satisfies string[] as unknown as readonly [stringful, ...string[]],
      {
        key = pre,
        selection = selected.join(selector),
        tail = rest,
      } = pre.length > 0
        ? selected.length > 1 || (selected[0] as string).length > 0
          ? {}
          : {
              selection: rest[0] ?? "",
              tail: rest.slice(1),
            }
        : { key: TRANSLATE };

      return [
        key,
        `${SELECTOR}${selection}` as stringful,
        ...tail,
      ] as const;
    }
  }

  public toString() {
    return `${this.key satisfies stringful} ${this.natural}` as stringful;
  }
}

export default Query;

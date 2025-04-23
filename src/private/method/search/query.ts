export default function (
  input: string,
  SELECTORS: Arrayful<char>,
  OPERATORS: stringful,
  FALLBACKS: Arrayful<stringful>,
  alias: FieldTable,
  engines: Set<string>,
) {
  function select(
    input: string,
    SELECTORS: Arrayful<char>,
    OPERATORS: stringful,
    FALLBACKS: Arrayful<stringful>,
  ) {
    function expand(
      input: string,
      OPERATORS: stringful,
      FALLBACKS: Arrayful<stringful>,
    ) {
      function tokenize(
        input: string,
        FALLBACKS: Arrayful<stringful>,
      ) {
        const tokens = input
          .split(" ")
          .filter((token): token is stringful => token !== ""),
        spaces = input.length - input.trimStart().length;

        if (spaces > 0)
          tokens.unshift(
            FALLBACKS.at(
              Math.min(
                spaces,
                FALLBACKS.length,
              ) - 1,
            ) as stringful,
          );

        if (tokens.length === 0)
          throw new RangeError("No query", { cause: input });

        return tokens as Arrayful<stringful>;
      }

      const tokens = tokenize(
        input,
        FALLBACKS,
      ),
      [[char0, char1]] = tokens;

      return [
        ...char0 >= "0"
        && char0 <= "9"
        || OPERATORS.includes(char0)
        || typeof char1 !== "undefined"
        && Number.isFinite(Number([char0, char1].join("")))
          ? ["math" satisfies literalful<"math"> as stringful] as const
          : [] as const,
        ...tokens,
      ] as const;
    }

    for (const selector of SELECTORS)
      if (OPERATORS.includes(selector))
        throw new SyntaxError("Operators contain forbidden selector");

    const tokens = expand(
      input,
      OPERATORS,
      FALLBACKS,
    ),
    [head, ...terms] = tokens,
    selector = SELECTORS.find(selector => head.includes(selector));

    if (typeof selector === "undefined")
      return tokens;
    else {
      const [newHead = "", ...parts] = head.split(selector),
      key = newHead === "" ? "translate" satisfies literalful<"translate"> as stringful : newHead as stringful,
      selection = [
        SELECTORS[0],
        selector === "."
        && parts.length === 1
        && parts.at(0) === ""
          ? terms.shift() ?? ""
          : parts.join(selector),
      ]
        .join("") as stringful;

      return [
        key,
        selection,
        ...terms,
      ] as const;
    }
  }

  const [_K, ..._terms] = select(
    input,
    SELECTORS,
    OPERATORS,
    FALLBACKS,
  ),
  _key = (_K satisfies stringful).toLowerCase() as stringful,
  {
    key = _key,
    terms = [..._terms] as const,
  } = engines.has(_key)
    ? {}
    : _key in alias
      ? { key: alias[_key] as stringful }
      : {
          key: "chat" satisfies literalful<"chat"> as stringful,
          terms: [_K, ..._terms] as const,
        },
  termString = terms.join(" "),
  {
    question = null,
    recomposed = key,
  } = termString === ""
    ? {}
    : {
        question: termString as stringful,
        recomposed: [
          key,
          termString,
        ]
          .join(" "),
      };

  return {
    key,
    terms,
    question,
    recomposed,
  };
}

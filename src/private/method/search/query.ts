export default function (
  query: string,
  alias: FieldTable,
  engines: Set<string>,
  FALLBACKS: Arrayful<stringful>,
  OPERATORS: stringful,
  SELECTORS: Arrayful<char>,
) {
  function select(
    query: string,
    FALLBACKS: Arrayful<stringful>,
    OPERATORS: stringful,
    SELECTORS: Arrayful<char>,
  ) {
    function expand(
      query: string,
      FALLBACKS: Arrayful<stringful>,
      OPERATORS: stringful,
    ) {
      function tokenize(
        query: string,
        FALLBACKS: Arrayful<stringful>,
      ) {
        const tokens = query
          .split(" ")
          .filter((token): token is stringful => token !== ""),
        spaces = query.length - query.trimStart().length;

        if (spaces > 0)
          tokens.unshift(
            FALLBACKS.at(
              Math.min(
                spaces,
                FALLBACKS.length,
              ) - 1,
            )!,
          );

        if (tokens.length === 0)
          throw new RangeError(
            "No query",
            { cause: query },
          );

        return tokens as Arrayful<stringful>;
      }

      const tokens = tokenize(
        query,
        FALLBACKS,
      ),
      [[t00, t01]] = tokens;

      return [
        ...t00 >= "0"
        && t00 <= "9"
        || OPERATORS.includes(t00)
        || typeof t01 !== "undefined"
        && Number.isFinite(
          Number(
            `${t00}${t01}`,
          ),
        )
          ? ["math" as stringful] as const
          : [] as const,
        ...tokens,
      ] as const;
    }

    for (const selector of SELECTORS)
      if (OPERATORS.includes(selector))
        throw new SyntaxError("Operators contain forbidden selector");

    const tokens = expand(
      query,
      FALLBACKS,
      OPERATORS,
    ),
    [head, ...terms] = tokens,
    selector = SELECTORS
      .find(
        selector => head
          .includes(
            selector,
          ),
      );

    if (typeof selector === "undefined")
      return tokens;
    else {
      const [newHead = "", ...parts] = head
        .split(
          selector,
        ),
      key = newHead === ""
        ? "translate" as stringful
        : newHead as stringful,
      selection = [
        SELECTORS[0],
        selector === "."
        && parts.length === 1
        && parts.at(0) === ""
          ? terms.shift()
            ?? ""
          : parts.join(selector),
      ].join("") as stringful;

      return [
        key,
        selection,
        ...terms,
      ] as const;
    }
  }

  const [_K, ..._terms] = select(
    query,
    FALLBACKS,
    OPERATORS,
    SELECTORS,
  ),
  _key = (_K satisfies stringful)
    .toLowerCase() as stringful,
  {
    key = _key,
    terms = [..._terms] as const,
  } = engines.has(_key)
    ? {}
    : _key in alias
      ? {
          key: alias[_key] as stringful,
        }
      : {
          key: "chat" as stringful,
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
        ].join(" "),
      };

  return {
    key,
    terms,
    question,
    recomposed,
  };
}

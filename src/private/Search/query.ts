export default function (
  query: string,
  alias: FieldTable,
  engines: Set<string>,
  FALLBACKS: Arrayful<stringful, true>,
  OPERATORS: stringful,
  SELECTORS: Arrayful<char, true>,
) {
  function parse(
    query: string,
    FALLBACKS: Arrayful<stringful, true>,
    OPERATORS: stringful,
    SELECTORS: Arrayful<char, true>,
  ) {
    function select(
      query: string,
      FALLBACKS: Arrayful<stringful, true>,
      OPERATORS: stringful,
      SELECTORS: Arrayful<char, true>,
    ) {
      function expand(
        query: string,
        FALLBACKS: Arrayful<stringful, true>,
        OPERATORS: stringful,
      ) {
        function tokenize(
          query: string,
          FALLBACKS: Arrayful<stringful, true>,
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
              "Empty query",
              { cause: { query } },
            );

          const [first, ...rest] = tokens;

          return [
            first as stringful,
            ...rest,
          ] as const;
        }

        const tokens = tokenize(
          query,
          FALLBACKS,
        ),
        [[token0_0, token0_1]] = tokens;

        return [
          ...token0_0 >= "0"
          && token0_0 <= "9"
          || OPERATORS.includes(token0_0)
          || typeof token0_1 !== "undefined"
          && Number.isFinite(
            Number(
              [
                token0_0,
                token0_1,
              ].join(""),
            ),
          )
            ? ["math" as stringful] as const
            : [] as const,
          ...tokens,
        ] as const;
      }

      for (const selector of SELECTORS)
        if (OPERATORS.includes(selector))
          throw new SyntaxError("Operators include reserved selector");

      const tokens = expand(
        query,
        FALLBACKS,
        OPERATORS,
      ),
      [head, ...terms] = tokens,
      selector = SELECTORS
        .find(
          selector => head.includes(selector),
        );

      if (typeof selector === "undefined")
        return tokens;
      else {
        const [newHead = "", ...parts] = head
          .split(selector),
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

    return select(
      query,
      FALLBACKS,
      OPERATORS,
      SELECTORS,
    );
  }

  const [Head, ...rest] = parse(
    query,
    FALLBACKS,
    OPERATORS,
    SELECTORS,
  ),
  head = (Head satisfies stringful)
    .toLocaleLowerCase() as stringful,
  {
    key = head,
    terms = [...rest] as const,
  } = engines.has(head)
    ? {}
    : head in alias && alias[head] !== ""
      ? {
          key: alias[head] as stringful,
        }
      : {
          key: "chat" as stringful,
          terms: [Head, ...rest] as const,
        };

  return {
    key,
    terms,
  };
}

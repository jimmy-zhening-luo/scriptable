export type { SearchOutput } from "./output";
export type { SearchSetting } from "./setting";
export default function (
  query: string,
  alias: FieldTable,
  engines: Set<string>,
  FALLBACKS: Arrayful<stringful, true>,
  OPERATORS: stringful,
  SELECTORS: Set<char>,
) {
  function parse(
    query: string,
    FALLBACKS: Arrayful<stringful, true>,
    OPERATORS: stringful,
    SELECTORS: Set<char>,
  ) {
    class SearchQueryToken<T extends "key" | "selection"> {
      constructor(
        public readonly type: T,
        public readonly token: stringful,
      ) {}
    }

    function select(
      query: string,
      FALLBACKS: Arrayful<stringful, true>,
      OPERATORS: stringful,
      SELECTORS: Set<char>,
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
          function front(
            query: string,
            FALLBACKS: Arrayful<stringful, true>,
          ) {
            const spaces = query.length - query.trimStart().length;

            return spaces > 0
              ? [
                  new SearchQueryToken(
                    "key",
                    FALLBACKS.at(spaces - 1)
                    ?? FALLBACKS.at(-1)!,
                  ),
                ] as const
              : [] as const;
          }

          const tokens = [
            ...front(query, FALLBACKS),
            ...query
              .split(" ")
              .filter((token): token is stringful => token !== ""),
          ] as const;

          if (tokens.length === 0)
            throw new RangeError("No search query");

          const [first, ...rest] = tokens;

          return [first, ...rest] as const;
        }

        const tokens = tokenize(
          query,
          FALLBACKS,
        ),
        [first] = tokens;

        if (typeof first !== "string")
          return tokens;
        else {
          const [first_0, first_1] = first;

          return [
            ...first_0 >= "0"
            && first_0 <= "9"
            || OPERATORS.includes(first_0)
            || typeof first_1 !== "undefined"
            && Number.isFinite(
              Number(first_0 + first_1),
            )
              ? [
                  new SearchQueryToken(
                    "key",
                    "math" as stringful,
                  ),
                ] as const
              : [] as const,
            ...tokens,
          ] as const;
        }
      }

      const tokens = expand(
        query,
        FALLBACKS,
        OPERATORS,
      ),
      [head, ...terms] = tokens;

      if (typeof head !== "string")
        return tokens;
      else {
        for (const selector of SELECTORS)
          if (OPERATORS.includes(selector))
            throw new SyntaxError("Operators include reserved selector");

        const selector = [...SELECTORS]
          .find(
            selector => head.includes(
              selector,
            ),
          );

        if (typeof selector === "undefined")
          return tokens;
        else {
          const [newHead = "", ...parts] = head
            .split(selector),
          key = newHead === ""
            ? "translate" as stringful
            : newHead as stringful,
          selection = (
            [...SELECTORS][0]!
            + selector === "."
            && parts.length === 1
            && parts.at(0) === ""
              ? terms.shift()
              ?? ""
              : parts.join(selector)
          ) as stringful;

          return [
            new SearchQueryToken("key", key),
            new SearchQueryToken("selection", selection),
            ...terms,
          ] as const;
        }
      }
    }

    const [key, ...terms] = select(
      query,
      FALLBACKS,
      OPERATORS,
      SELECTORS,
    );

    return [
      typeof key === "string"
        ? key
        : key.token,
      ...terms.map(
        term => typeof term === "string"
          ? term
          : term.token,
      ),
    ] as const;
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
    key,
    terms = rest,
  } = engines.has(head)
    ? {
        key: head,
      }
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
    query: terms.length === 0
      ? null
      : terms.join(" ") as stringful,
  };
}

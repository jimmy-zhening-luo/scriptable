import type { SearchSetting } from "../../types/Search";

export default function (
  input: string,
  engines: SearchSetting["engines"],
  alias: FieldTable,
  FALLBACK: Triad<stringful>,
  SELECTORS: Arrayful<char>,
  OPERATORS: stringful,
  MATH: stringful,
  TRANSLATE: stringful,
  CHAT: stringful,
) {
  function select(
    input: string,
    FALLBACK: Triad<stringful>,
    SELECTORS: Arrayful<char>,
    OPERATORS: stringful,
    MATH: stringful,
    TRANSLATE: stringful,
  ) {
    function expand(
      input: string,
      FALLBACK: Triad<stringful>,
      OPERATORS: stringful,
      MATH: stringful,
    ) {
      function tokenize(
        input: string,
        FALLBACK: Triad<stringful>,
      ) {
        const tokens = input
          .split(" ")
          .filter((token): token is stringful => token !== ""),
        spaces = input.length - input.trimStart().length;

        if (spaces > 0)
          tokens.unshift(
            FALLBACK.at(
              Math.min(
                spaces,
                FALLBACK.length,
              ) - 1,
            ) as stringful,
          );

        if (tokens.length === 0)
          throw new RangeError("Query has no tokens", { cause: input });

        return tokens as Arrayful<stringful>;
      }

      const tokens = tokenize(input, FALLBACK),
      [head = [char0, char1]] = tokens;

      return [
        ...char0 >= "0"
        && char0 <= "9"
        || OPERATORS.includes(char0)
        || typeof char1 !== "undefined"
        && Number.isFinite(Number([char0, char1].join("")))
          ? [MATH] as const
          : [] as const,
        ...tokens,
      ] as const;
    }

    for (const selector of SELECTORS)
      if (OPERATORS.includes(selector))
        throw new SyntaxError("Operators contain forbidden selector");

    const tokens = expand(
      input,
      FALLBACK,
      OPERATORS,
      MATH,
    ),
    [head, ...terms] = tokens,
    selector = SELECTORS.find(selector => head.indexOf(selector) >= 0);

    if (typeof selector === "undefined")
      return tokens;
    else {
      const [newHead = "", ...parts] = head.split(selector),
      key = newHead === "" ? TRANSLATE : newHead as stringful,
      selection = [
        SELECTORS[0],
        selector === "."
        && parts.length === 1
        && parts.at(0) === ""
          ? terms.pop() ?? ""
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
    FALLBACK,
    SELECTORS,
    OPERATORS,
    MATH,
    TRANSLATE,
  ),
  _key = (_K satisfies stringful).toLowerCase() as stringful,
  {
    key = _key,
    terms = [..._terms] as const,
  } = _key in engines
    ? {}
    : _key in alias
      ? { key: alias[_key] as stringful }
      : {
          key: CHAT,
          terms: [_K, ..._terms] as const,
        },
  termString = terms.join(" "),
  {
    question = null,
    recomposed = key,
  } = termString === ""
    ? {}
    : {
        question: termString,
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

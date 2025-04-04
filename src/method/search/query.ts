import type { SearchSetting } from "../../types/Search";

export default function (
  input: string,
  engines: SearchSetting["engines"],
  alias: FieldTable,
  FALLBACK: Triad<stringful>,
  SELECTOR: char,
  OPERATORS: stringful,
  MATH: stringful,
  TRANSLATE: stringful,
  CHAT: stringful,
) {
  function select(
    input: string,
    FALLBACK: Triad<stringful>,
    SELECTOR: char,
    OPERATORS: stringful,
    MATH: stringful,
    TRANSLATE: stringful,
  ) {
    function operate(
      input: string,
      FALLBACK: Triad<stringful>,
      OPERATORS: stringful,
      MATH: stringful,
    ) {
      function tokenize(
        input: string,
        FALLBACK: Triad<stringful>,
      ) {
        const tokens = input.split(" ").filter((token): token is stringful => token !== ""),
        spaces = input.length - input.trimStart().length;

        if (spaces > 0)
          tokens.unshift(FALLBACK.at(Math.min(spaces, FALLBACK.length) - 1) as stringful);

        if (tokens.length < 1)
          throw new RangeError("Query has no tokens", { cause: input });

        return tokens as Arrayful<stringful>;
      }

      function numeric(char: char, operators = "") {
        return char >= "0" && char <= "9" || operators.includes(char);
      }

      const [head, ...rest] = tokenize(input, FALLBACK);

      return [
        ...numeric(head[0], OPERATORS)
        || head.length > 1
        && head.startsWith(".")
        && numeric(head[1] as char)
          ? [MATH] as const
          : [] as const,
        head,
        ...rest,
      ] as const;
    }

    const tokens = operate(
      input,
      FALLBACK,
      OPERATORS,
      MATH,
    ),
    [head, ...rest] = tokens,
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
      } = pre === ""
        ? { key: TRANSLATE }
        : selected.length < 2 && (selected[0] as string) === ""
          ? {
              selection: rest[0] ?? "",
              tail: rest.slice(1),
            }
          : {};

      return [
        key,
        `${SELECTOR}${selection}` as stringful,
        ...tail,
      ] as const;
    }
  }

  if (`${SELECTOR}${OPERATORS}`.includes("."))
    throw new SyntaxError("Bad selector/operator");

  const [_K, ..._terms] = select(
    input,
    FALLBACK,
    SELECTOR,
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
        recomposed: `${key} ${termString}`,
      };

  return {
    key,
    terms,
    question,
    recomposed,
  };
}

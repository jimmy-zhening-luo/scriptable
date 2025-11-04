import type { Setting } from "./types";
import { QueryArgument } from "./argument";

export { resolver } from "./resolver";
export function parser(
  input: string,
  chars: Set<stringful>,
  engines: Set<stringful>,
  alias: Setting["alias"],
  RESERVED: Setting["reserved"]["keys"],
  selectors: Setting["reserved"]["selectors"],
) {
  const _input = input.trimStart(),
  hotkey = input.length - _input.length,
  query = _input
    .trimEnd()
    .split(" ")
    .filter(
      (token): token is stringful => token !== "",
    ) as Arrayful<stringful>;

  switch (hotkey) {
  case 0:
    break;
  case 1:
    return {
      key: RESERVED.ask,
      terms: query,
    };
  default:
    return {
      key: RESERVED.translate,
      terms: query,
    };
  }

  const [first] = query;

  if (
    first.length === 1
    && query.length === 1
  )
    return {
      key: chars.has(first)
        ? first
        : RESERVED.skip,
      terms: [],
    };

  if (new Set("0123456789.-+($€£¥").has(first[0]))
    return {
      key: RESERVED.math,
      terms: query,
    };

  function select(
    first: stringful,
    query: Arrayful<stringful>,
    selectors: string,
  ) {
    const FIRST = new Set(first),
    selectorful = selectors + "." as stringful,
    SELECTORS = new Set<char>(selectorful satisfies stringful as unknown as char[]),
    selector = SELECTORS
      .values()
      .find(
        selector => FIRST.has(selector),
      );

    if (selector === undefined)
      return null;

    const boundary = first.indexOf(selector);

    return {
      key: boundary === 0
        ? null
        : first.slice(0, boundary) as stringful,
      argument: new QueryArgument(
        selectorful[0],
        selector,
        first.slice(boundary + 1),
        query[1],
      ),
    };
  }

  const option = select(
    first,
    query,
    selectors,
  );

  switch (option?.key) {
  case null:
    query[0] = option.argument.argument;

    return {
      key: RESERVED.translate,
      terms: query,
    };
  case undefined: {
    const keyterm = (/^(\W+)(\w+)$/u)
      .exec(first) as Null<
      Triple<stringful>
    >;

    if (keyterm !== null) {
      query[0] = keyterm[2];
      void query.unshift(keyterm[1]);
    }

    break;
  }
  default:
    break;
  }

  const candidate = (
    option === null
      ? query[0]
      : option.key
  )
    .toLocaleLowerCase() as stringful,
  key = candidate.length === 1
    ? chars.has(candidate)
      ? candidate
      : undefined
    : engines.has(candidate)
      ? candidate
      : alias[candidate];

  if (key === undefined)
    return {
      key: RESERVED.ask,
      terms: query,
    };

  query.shift();

  return {
    key,
    terms: option === null
      ? query
      : option
          .argument
          .prepend(query),
  };
}

import type { Setting } from "./types";
import { QueryArgument } from "./argument";

export { resolver } from "./resolver";
export function parser(
  input: string,
  chars: Set<stringful>,
  engines: Set<stringful>,
  alias: Setting["alias"],
  RESERVED: Setting["reserved"]["keys"],
  selector: Setting["reserved"]["selector"],
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

  if (first.startsWith(selector))
    return {
      key: RESERVED.translate,
      terms: query,
    };

  if (
    new Set("0123456789.-+($€£¥").has(
      first[0],
    )
  )
    return {
      key: RESERVED.math,
      terms: query,
    };

  const keyterm = (/^(\W+)(\w.*)$/u)
    .exec(first) as Null<
    Triple<stringful>
  >;

  if (keyterm !== null) {
    query[0] = keyterm[2];
    void query.unshift(keyterm[1]);
  }

  function select(
    first: stringful,
    query: Arrayful<stringful>,
    selector: char,
  ) {
    const FIRST = new Set(first),
    match = FIRST.has(selector)
      ? selector
      : FIRST.has(".")
        ? "." as char
        : null;

    if (match === null)
      return null;

    const boundary = first.indexOf(match);

    return {
      key: first.slice(0, boundary) as stringful,
      argument: new QueryArgument(
        selector,
        match,
        first.slice(boundary + 1),
        query[1],
      ),
    };
  }

  const option = keyterm === null
    ? select(
        first,
        query,
        selector,
      )
    : null,
  candidate = (
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

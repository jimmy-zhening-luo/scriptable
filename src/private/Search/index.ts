import type { Setting } from "./types";
import { QueryArgument } from "./argument";

export { resolver } from "./resolver";
export function parser(
  input: string,
  setting: Setting,
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
      key: setting.reserved.keys.ask,
      terms: query,
    };
  default:
    return {
      key: setting.reserved.keys.translate,
      terms: query,
    };
  }

  const [first] = query;

  if (
    first.length === 1
    && query.length === 1
  )
    return {
      key: first in setting.chars
        ? first
        : setting.reserved.keys.skip,
      terms: [],
    };

  if (first.startsWith(setting.reserved.selector))
    return {
      key: setting.reserved.keys.translate,
      terms: query,
    };

  const [f0] = first;

  if (
    f0 >= "0"
    && f0 <= "9"
    || ".-+($€£¥".includes(f0)
  )
    return {
      key: setting.reserved.keys.math,
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
    const match = first.includes(selector)
      ? selector
      : first.includes(".")
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
        setting.reserved.selector,
      )
    : null,
  candidate = (
    option === null
      ? query[0]
      : option.key
  )
    .toLocaleLowerCase() as stringful,
  key = candidate.length === 1
    ? candidate in setting.chars
      ? candidate
      : undefined
    : candidate in setting.engines
      ? candidate
      : setting.alias[candidate];

  if (key === undefined)
    return query.length === 1
      ? {
          key: setting.reserved.keys.skip,
          terms: [],
        }
      : {
          key: setting.reserved.keys.ask,
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

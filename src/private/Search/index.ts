import type { Setting } from "./types";

export { resolver } from "./resolver";
export function parser(
  input: string,
  setting: Setting,
) {
  const enum Special {
    Delimiter = " ",
    Selector = ".",
    Operators = Selector + "-+($€£¥",
  }

  const _input = input.trimStart(),
  hotkey = input.length - _input.length,
  query = _input
    .trimEnd()
    .split(Special.Delimiter)
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
  ) {
    const candidate = first.toLocaleLowerCase() as stringful;

    return {
      key: candidate in setting.chars
        ? candidate
        : setting.reserved.keys.skip,
      terms: [],
    };
  }

  if (first.startsWith(setting.reserved.selector))
    return {
      key: setting.reserved.keys.translate,
      terms: query,
    };

  const [f0] = first;

  if (
    f0 >= "0"
    && f0 <= "9"
    || Special.Operators.includes(f0)
  )
    return {
      key: setting.reserved.keys.math,
      terms: query,
    };

  const keyterm = (/^(\w+|\W+)\b(.+)$/u)
    .exec(first) as Null<Triple<stringful>>;

  if (keyterm !== null) {
    const [
      ,
      key,
      term,
    ] = keyterm;

    if (term === Special.Selector) {
      if (query.length === 1)
        query[0] = setting.reserved.selector;
      else
        void query.splice(
          0,
          2,
          setting.reserved.selector + query[1]! as stringful,
        );
    }
    else
      query[0] = term;

    void query.unshift(key);
  }

  const candidate = query[0].toLocaleLowerCase() as stringful,
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
    terms: query,
  };
}

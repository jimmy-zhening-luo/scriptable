import type { Setting } from "./types";

export { resolver } from "./resolver";
export function parser(
  input: string,
  setting: Setting,
  skip: stringful,
) {
  const enum Special {
    Delimiter = " ",
    Selector = ".",
    Operators = "-+($€£¥",
  }

  const _input = input.trimStart(),
  hotkey = input.length - _input.length,
  query = _input
    .trimEnd()
    .split(Special.Delimiter)
    .filter(
      (token): token is stringful => token as unknown as boolean,
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

  const [first] = query,
  depth = first.length - 1,
  span = query.length - 1;

  if (!depth && !span) {
    const candidate = first.toLocaleLowerCase() as stringful;

    return {
      key: candidate in setting.chars
        ? candidate
        : skip,
      terms: [],
    };
  }

  if (first.startsWith(setting.reserved.selector))
    return {
      key: setting.reserved.keys.translate,
      terms: query,
    };

  const f0 = first.at(0)!;

  if (
    f0 >= "0"
    && f0 <= "9"
    || depth
    && (
      f0 === Special.Selector as char
      && first[1]! >= "0"
      && first[1]! <= "9"
      || Special.Operators.includes(f0)
    )
  )
    return {
      key: setting.reserved.keys.math,
      terms: query,
    };

  if (depth) {
    const keyterm = (/^(\w+|\W+)\b(.+)/u)
      .exec(first) as Null<Triple<stringful>>;

    if (keyterm) {
      const [
        ,
        key,
        term,
      ] = keyterm;

      if (term === Special.Selector as char)
        if (span)
          void query.splice(
            0,
            2,
            setting.reserved.selector + query[1]! as stringful,
          );
        else
          query[0] = setting.reserved.selector;

      else
        query[0] = term;

      void query.unshift(key);
    }
  }

  const candidate = query[0].toLocaleLowerCase() as stringful,
  key = candidate.length === 1
    ? candidate in setting.chars
      ? candidate
      : undefined
    : candidate in setting.engines
      ? candidate
      : setting.alias[candidate];

  if (!key)
    return query.length === 1
      ? {
          key: skip,
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

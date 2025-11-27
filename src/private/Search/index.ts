import type { Setting, Query } from "./types";

export { resolver } from "./resolver";
export function parser(
  input: string,
  setting: Setting,
  skip: stringful,
  repeat: char,
): Query {
  const _input = input.trimStart(),
  hotkey = input.length - _input.length,
  query = _input
    .trimEnd()
    .split(" ")
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
      key: candidate === repeat
        || candidate in setting.chars
        ? candidate
        : skip,
      terms: [],
    };
  }

  const enum Selector {
    Primary = "'",
    Backup = ".",
  }
  const f0 = first.at(0)!;

  switch (f0) {
  case Selector.Primary:
    return {
      key: setting.reserved.keys.translate,
      terms: query,
    };
  case repeat: {
    if (depth) {
      const term = first.slice(1);

      if (term === Selector.Backup)
        query[0] = Selector.Primary
      else if (term.startsWith(Selector.Backup))
        foo = 30;
      else
        query[0] = term;

      if (term.startsWith(Selector.Backup))
        if (term === Selector.Backup)
          query[0] = Selector.Primary;
        else
          query.unshift(
            Selector.Primary
            query.slice(0, 1),
          );

          query.splice(
            0,
            1,
            Selector.Primary,
            term.slice(1),
          );

      query[0] = term.startsWith(.) === Selector.Backup
        ? Selector.Primary + term

      if (term.at(0) === Selector.Backup) {
        query.splice(
          0,
          1,
          Selector.Primary,
          term.slice(1),
        );
      }
      else
        query[0] = term;
    }
    else
      void query.shift();

    return {
      key: repeat as stringful,
      terms: query,
    }
  }
  default:
    if (
      f0 >= "0"
      && f0 <= "9"
      || depth
      && (
        f0 === Selector.Backup
        && first[1]! >= "0"
        && first[1]! <= "9"
        || "-+($€£¥".includes(f0)
      )
    )
      return {
        key: setting.reserved.keys.math,
        terms: query,
      };
  }

  if (depth) {
    const keyterm = (/^(\w+|\W+)\b(.+)/u)
      .exec(first) as Null<Triple<stringful>>;

    if (keyterm) {
      const [
        ,
        key,
        term,
      ] = keyterm;

      if (term === Selector.Backup)
        if (span)
          void query.splice(
            0,
            2,
            Selector.Primary + query[1]! as stringful,
          );
        else
          query[0] = Selector.Primary;

      else
        query[0] = term;

      void query.unshift(key);
    }
  }

  const candidate = query[0].toLocaleLowerCase() as stringful,
  key = candidate.length === 1
    ? candidate === repeat
    || candidate in setting.chars
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

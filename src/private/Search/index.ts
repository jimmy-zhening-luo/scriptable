import type { Setting, Query } from "./types";

export { resolver } from "./resolver";
export function parser(
  input: string,
  setting: Setting,
): Query {
  const _input = input.trimStart(),
  hotkey = input.length - _input.length,
  query = _input
    .trimEnd()
    .split(" ")
    .filter(
      (token): token is stringful => token as unknown as boolean,
    ) as Arrayful<stringful>;

  const enum Reserved {
    None = "none",
    Ask = "ask",
    Math = "math",
    Translate = "translate",
    Repeat = "/",
  }

  switch (hotkey) {
  case 0:
    break;
  case 1:
    return {
      key: Reserved.Ask as stringful,
      terms: query,
      manifest: setting.engines[Reserved.Ask as stringful]!,
    };
  default:
    return {
      key: Reserved.Translate as stringful,
      terms: query,
      manifest: setting.engines[Reserved.Translate as stringful]!,
    };
  }

  const [first] = query,
  depth = first.length - 1,
  span = query.length - 1;

  if (!depth && !span)
    if (first === Reserved.Repeat)
      return { prior: true };
    else {
      const key = first.toLocaleLowerCase() as stringful;

      return key in setting.chars
        ? {
            key,
            manifest: setting.chars[key]!,
          }
        : {
            key: Reserved.None as stringful,
            manifest: setting.engines[Reserved.None as stringful]!,
          };
    }

  const enum Selector {
    Primary = "'",
    Backup = ".",
  }
  const select = (term: stringful) => {
    if (term === Selector.Backup)
      if (span)
        void query.splice(
          0,
          2,
          Selector.Primary + query[1]! as stringful,
        );
      else
        query[0] = Selector.Primary as stringful;

    else
      query[0] = term;
  },
  f0 = first.at(0)!;

  switch (f0) {
  case Selector.Primary:
    return {
      key: Reserved.Translate as stringful,
      terms: query,
      manifest: setting.engines[Reserved.Translate as stringful]!,
    };
  case Reserved.Repeat: {
    if (depth)
      select(first.slice(1) as stringful);
    else
      void query.shift();

    return {
      terms: query,
      prior: true,
    };
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
        key: Reserved.Math as stringful,
        terms: query,
        manifest: setting.engines[Reserved.Math as stringful]!,
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

      select(term);
      void query.unshift(key);
    }
  }

  const candidate = query[0].toLocaleLowerCase() as stringful;

  if (candidate === Reserved.Repeat) {
    query.shift();

    return {
      terms: query,
      prior: true,
    };
  }

  const key = candidate.length === 1
    ? candidate in setting.chars
      ? candidate
      : null
    : candidate in setting.engines
      ? candidate
      : setting.alias[candidate];

  if (!key)
    return query.length === 1
      ? {
          key: Reserved.None as stringful,
          manifest: setting.engines[Reserved.None as stringful]!,
        }
      : {
          key: Reserved.Ask as stringful,
          terms: query,
          manifest: setting.engines[Reserved.Ask as stringful]!,
        };

  query.shift();

  return {
    key,
    terms: query,
    manifest: key.length === 1
      ? setting.chars[key]!
      : setting.engines[key]!,
  };
}

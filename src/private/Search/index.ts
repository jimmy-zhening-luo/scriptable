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
      manifest: setting.engines[Reserved.Ask as stringful] as { shortcut: stringful },
    };
  default:
    return {
      key: Reserved.Translate as stringful,
      terms: query,
      manifest: setting.engines[Reserved.Translate as stringful] as { shortcut: stringful },
    };
  }

  const [first] = query,
  weight = first.length - 1,
  span = query.length - 1;

  if (!weight && !span)
    if (first === Reserved.Repeat)
      return { prior: true };
    else {
      const key = first.toLocaleLowerCase() as stringful,
      draft = setting.chars[key],
      manifest = draft && (
        typeof draft === "object"
          ? draft
          : { url: draft }
      );

      return manifest
        ? {
            key,
            manifest,
          }
        : {
            key: Reserved.None as stringful,
            manifest: setting.engines[Reserved.None as stringful] as { shortcut: stringful },
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
      manifest: setting.engines[Reserved.Translate as stringful] as { shortcut: stringful },
    };
  case Reserved.Repeat: {
    if (weight)
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
      || weight
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
        manifest: setting.engines[Reserved.Math as stringful] as { shortcut: stringful },
      };
  }

  if (weight) {
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
    void query.shift();

    return {
      terms: query,
      prior: true,
    };
  }

  const override = candidate.length === 1
    ? undefined
    : setting.alias[candidate],
  mask = typeof override === "object",
  alias = mask ? override.alias : override,
  key = alias ?? candidate,
  draft = key.length === 1
    ? setting.chars[key]
    : setting.engines[key],
  manifest = draft && (
    typeof draft === "object"
      ? draft
      : { url: draft }
  );

  if (manifest) {
    if (mask)
      manifest.prepend = override.prepend;

    void query.shift();

    return {
      key,
      terms: query,
      manifest,
    };
  }

  return query.length === 1
    ? {
        key: Reserved.None as stringful,
        manifest: setting.engines[Reserved.None as stringful] as { shortcut: stringful },
      }
    : {
        key: Reserved.Ask as stringful,
        terms: query,
        manifest: setting.engines[Reserved.Ask as stringful] as { shortcut: stringful },
      };
}

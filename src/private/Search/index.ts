import type {
  Setting,
  reserved,
  Query,
} from "./types";

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
    Translate = "translate",
    Repeat = "/",
  }
  switch (hotkey) {
    case 0:
      break;
    case 1:
      return {
        key: Reserved.Ask as reserved,
        terms: query,
        draft: setting.engines[Reserved.Ask as reserved]!,
      };
    default:
      return {
        key: Reserved.Translate as reserved,
        terms: query,
        draft: setting.engines[Reserved.Translate as reserved]!,
      };
  }

  const [first] = query,
  weight = first.length - 1,
  span = query.length - 1;

  if (weight || span) {
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

    const enum Digit {
      Zero = `0`,
      Nine = `9`,
      Operator = "-+($€£¥",
    }
    const enum Operator {
      Unary = "-+",
      Closure = "(",
      Currency = "$€£¥",
      Any = Unary + Closure + Currency,
    }
    switch (f0) {
      case Selector.Primary:
        return {
          key: Reserved.Translate as reserved,
          terms: query,
          draft: setting.engines[Reserved.Translate as reserved]!,
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
          f0 >= Digit.Zero
          && f0 <= Digit.Nine
          || weight
          && (
            f0 === Selector.Backup
            && first[1]! >= Digit.Zero
            && first[1]! <= Digit.Nine
            || Operator.Any.includes(f0)
          )
        )
          return {
            key: Reserved.Ask as reserved,
            terms: query,
            draft: setting.engines[Reserved.Ask as reserved]!,
          };
    }

    if (weight) {
      const keyterm = (/^(\w+|\W+)\b(.+)/v)
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
  }

  const candidate = query[0].toLocaleLowerCase() as stringful;

  if (candidate === Reserved.Repeat) {
    void query.shift();

    return {
      terms: query,
      prior: true,
    };
  }

  const override = candidate in setting.alias
    ? setting.alias[candidate]!
    : null,
  { key, prepend } = override
    ? typeof override === "string"
      ? { key: override }
      : override
    : { key: candidate },
  draft = key in setting.engines
    ? setting.engines[key]
    : null;

  if (draft) {
    void query.shift();

    return prepend
      ? {
          key,
          terms: query,
          draft,
          override: prepend,
        }
      : {
          key,
          terms: query,
          draft,
        };
  }

  return query.length === 1
    ? {
        key: Reserved.None as reserved,
        draft: setting.engines[Reserved.None as reserved]!,
      }
    : {
        key: Reserved.Ask as reserved,
        terms: query,
        draft: setting.engines[Reserved.Ask as reserved]!,
      };
}

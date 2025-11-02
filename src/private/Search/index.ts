import type { SearchSetting } from "./types/setting";
import { QueryArgument } from "./argument";

export type { SearchSetting };
export type { SearchOutput } from "./types/output";

export default function (
  input: string,
  chars: Set<stringful>,
  engines: Set<stringful>,
  alias: SearchSetting["alias"],
  RESERVED: SearchSetting["reserved"]["keys"],
  selectors: SearchSetting["reserved"]["selectors"],
) {
  const _input = input.trimStart(),
  hotkey = input.length - _input.length,
  query = _input
    .trimEnd()
    .split(" ")
    .filter(
      (token): token is stringful => token !== "",
    ) as Arrayful<stringful>;

  if (hotkey !== 0)
    return {
      key: hotkey === 1
        ? RESERVED.chat
        : RESERVED.translate,
      terms: query,
    };
  else {
    const [first] = query;

    if (
      first.length === 1
      && query.length === 1
    ) {
      return {
        key: chars.has(first)
          ? first
          : RESERVED.skip,
        terms: [],
      }
    }
    else {
      if (new Set("0123456789.-+($€£¥").has(first[0]))
        return {
          key: RESERVED.math,
          terms: query,
        };
      else {
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
          else {
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
        }

        const option = select(
          first,
          query,
          selectors,
        );

        if (option?.key === null) {
          query[0] = option.argument.argument;

          return {
            key: RESERVED.translate,
            terms: query,
          };
        }
        else {
          if (option === null) {
            const keyterm = (/^(\W+)(\w+)$/u)
              .exec(first) as Null<
              Triple<stringful>
            >;

            if (keyterm !== null) {
              query[0] = keyterm[2];
              void query.unshift(keyterm[1]);
            }
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
              key: RESERVED.chat,
              terms: query,
            };
          else {
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
        }
      }
    }
  }
}

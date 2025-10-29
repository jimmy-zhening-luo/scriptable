import {
  SearchKey,
  QueryArgument,
} from "./token";
import type { SearchSetting } from "./setting";

export type { SearchSetting };
export type { SearchOutput } from "./output";
export { resolver } from "./resolver";

export function parser(
  query: string,
  engines: SearchSetting["engines"],
  alias: SearchSetting["alias"],
  RESERVED: SearchSetting["reserved"]["keys"],
  selectors: SearchSetting["reserved"]["selectors"],
) {
  function unshift(
    head: stringful,
    tail: stringful[],
  ) {
    tail.unshift(head);
  
    return tail;
  }

  function parse(
    query: string,
    selectors: string,
  ) {
    function select(
      query: string,
      selectors: string,
    ) {
      function expand(query: string) {
        function tokenize(query: string) {
          const hotkeys = query.length - query.trimStart().length,
          tail = query
            .trim()
            .split(" ")
            .filter((token): token is stringful => token !== "");

          return {
            Head: hotkeys === 0
              ? tail.shift()
              : hotkeys === 1
                ? new SearchKey("chat", true)
                : new SearchKey("translate", true),
            tail,
          };
        }

        const { Head, tail } = tokenize(query);

        if (Head === undefined)
          throw RangeError("No search query");

        return typeof Head === "string"
          && (Head.length !== 1 || tail.length !== 0)
          && new Set("0123456789+-$€£¥.(").has(Head[0])
          ? {
              Head: new SearchKey("math", true),
              tail: unshift(Head, tail),
            }
          : {
              Head,
              tail,
            };
      }

      const { Head, tail } = expand(query);

      if (
        typeof Head !== "string"
        || Head.length === 1 && tail.length === 0
      )
        return {
          Head,
          tail,
        };
      else {
        const HEAD = new Set(Head),
        selectorful = selectors + "." as stringful,
        SELECTORS = new Set<char>(selectorful satisfies stringful as unknown as char[]),
        selector = SELECTORS
          .values()
          .find(
            selector => HEAD.has(selector),
          );

        if (selector === undefined)
          return {
            Head,
            tail,
          };
        else {
          const boundary = Head.indexOf(selector),
          argument = new QueryArgument(
            selectorful[0],
            selector,
            Head.slice(boundary + 1),
            Head,
            tail[0],
          );

          return {
            Head: boundary === 0
              ? new SearchKey(
                  "translate",
                  true,
                  argument,
                )
              : new SearchKey(
                  Head.slice(0, boundary) as stringful,
                  false,
                  argument,
                ),
            tail,
          };
        }
      }
    }

    const { Head, tail } = select(
      query,
      selectors,
    );

    if (typeof Head !== "string")
      return {
        Head,
        tail,
      };
    else {
      const operation = (/^(\W+)(\w+)$/u)
        .exec(Head);

      if (operation === null)
        return {
          Head,
          tail,
        };
      else {
        const [
          ,
          key,
          operand,
        ] = operation as unknown as Triple<stringful>;

        return {
          Head: key,
          tail: unshift(operand, tail),
        };
      }
    }
  }

  const { Head, tail } = parse(
    query,
    selectors,
  );

  if (
    typeof Head !== "string"
    && Head.reserved === true
  ) {
    const key = RESERVED[Head.key];

    return {
      engine: engines[key];
      key,
      terms: Head
        .argument
        ?.select(tail)
        ?? tail,
    };
  }
  else {
    const head = (
      typeof Head === "string"
        ? Head
        : Head.key
    )
      .toLocaleLowerCase() as stringful,
    aliased = alias[head],
    {
      engine,
      key = head,
    } = aliased === undefined
      ? { engine: engines[head] }
      : {
          engine: engines[aliased],
          key: aliased,
        };

    if (engine === undefined) {
      const fallback = tail.length === 0
        ? RESERVED.skip
        : RESERVED.chat;

      return {
        key: fallback,
        terms: unshift(
          typeof Head === "string"
            ? Head as stringful
            : Head
              .argument
              ?.deselect
              ?? Head.key,
          tail,
        ),
        engine: engines[fallback],
      };
    }
    else
      return {
        key,
        terms: typeof Head === "string"
          ? tail
          : Head
            .argument
            ?.select(tail)
            ?? tail,
        engine,
      };
  }
}

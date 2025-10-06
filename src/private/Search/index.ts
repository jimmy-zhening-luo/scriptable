export type { SearchOutput } from "./output";
export type { SearchSetting } from "./setting";
export default function (
  query: string,
  engines: Set<string>,
  alias: FieldTable,
  SELECTORS: Set<char>,
) {
  function parse(
    query: string,
    SELECTORS: Set<char>,
  ) {
    function select(
      query: string,
      SELECTORS: Set<char>,
    ) {
      class ReservedSearchQueryKey<
        Engine extends
        | "chat"
        | "translate"
        | "math",
      > {
        public readonly key;

        constructor(public readonly engine: Engine) {
          this.key = engine as stringful;
        }
      }

      class SearchQuerySelectionCandidate {
        public readonly consumes;
        public readonly selection;

        constructor(
          public readonly key: stringful,
          {
            canonical,
            match,
          }: Record<
            | "canonical"
            | "match",
            stringful
          >,
          selection: string,
          next: string,
          public readonly deselect: stringful,
        ) {
          this.consumes = selection === ""
            && match === ".";
          this.selection = canonical.concat(
            this.consumes
              ? next
              : selection,
          ) as stringful;
        }
      }

      function expand(query: string) {
        function tokenize(query: string) {
          function hot(query: string) {
            switch (query.length - query.trimStart().length) {
              case 0:
                return [] as const;
              case 1:
                return [new ReservedSearchQueryKey("chat")] as const;
              default:
                return [new ReservedSearchQueryKey("translate")] as const;
            }
          }

          const tokens = [
            ...hot(query),
            ...query
              .split(" ")
              .filter((token): token is stringful => token !== ""),
          ] as const;

          if (tokens.length === 0)
            throw RangeError("Empty search query");

          const [Head, ...tail] = tokens;

          return {
            Head,
            tail: tail as stringful[],
          };
        }

        const { Head, tail } = tokenize(query);

        return typeof Head === "string"
          && new Set("0123456789+-$€£¥.(").has(Head[0] as string)
          && (Head.length !== 1 || tail.length !== 0)
          ? {
              Head: new ReservedSearchQueryKey("math"),
              tail: [Head, ...tail],
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
        void SELECTORS.delete("." as char);
        void SELECTORS.add("." as char);

        const selectors = [...SELECTORS],
        match = selectors.find(
          selector => Head.includes(selector),
        );

        if (match === undefined)
          return {
            Head,
            tail,
          };
        else {
          const canonical = selectors[0]!,
          [
            key = "",
            ...selectionShards
          ] = Head.split(match),
          selection = selectionShards.join(match);

          return key === ""
            ? {
                Head: new ReservedSearchQueryKey("translate"),
                tail: [
                  canonical.concat(
                    selection === ""
                    && match === "."
                      ? tail.shift() ?? ""
                      : selection,
                  ) as stringful,
                  ...tail,
                ],
              }
            : {
                Head: new SearchQuerySelectionCandidate(
                  key as stringful,
                  {
                    canonical,
                    match,
                  },
                  selection,
                  tail.at(0) ?? "",
                  Head,
                ),
                tail,
              };
        }
      }
    }

    const { Head, tail } = select(
      query,
      SELECTORS,
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
          tail: [operand, ...tail],
        };
      }
    }
  }

  const { Head, tail } = parse(
    query,
    SELECTORS,
  );

  if (
    typeof Head !== "string"
    && !("selection" in Head)
  )
    return {
      key: Head.key,
      terms: tail,
      parsed: true,
    };
  else {
    function dealias(
      engines: Set<string>,
      key = "",
    ) {
      if (key === "")
        throw TypeError(
          "Engine key must be stringful",
          { cause: "Unstringful aliased engine" },
        );
      else if (!engines.has(key))
        throw ReferenceError(
          "Aliased engine does not exist",
          { cause: key },
        );

      return key as stringful;
    }

    const head = (
      typeof Head === "string"
        ? Head
        : Head.key
    )
      .toLocaleLowerCase() as stringful,
    key = engines.has(head)
      ? head
      : head in alias
        ? dealias(engines, alias[head])
        : null;

    return {
      parsed: true,
      ...key === null
        ? {
            key: tail.length === 0
              ? "null" as stringful
              : "chat" as stringful,
            terms: [
              typeof Head === "string"
                ? Head
                : Head.deselect,
              ...tail,
            ],
          }
        : {
            key,
            terms: typeof Head === "string"
              ? tail
              : [
                  Head.selection,
                  ...Head.consumes
                    ? tail.slice(1)
                    : tail,
                ],
          },
    };
  }
}

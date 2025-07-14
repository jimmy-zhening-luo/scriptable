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
          selectors: {
            readonly canonical: stringful;
            readonly match: stringful;
          },
          selection: string,
          next: string,
          public readonly deselect: stringful,
        ) {
          this.consumes = selection === ""
            && selectors.match === ".";
          this.selection = [
            selectors.canonical,
            this.consumes
              ? next
              : selection,
          ]
            .join("") as stringful;
        }
      }

      function expand(query: string) {
        function tokenize(query: string) {
          function fallback(query: string) {
            const frontage = query.length - query.trimStart().length;

            return frontage === 0
              ? [] as const
              : [
                  new ReservedSearchQueryKey(
                    frontage === 1
                      ? "chat"
                      : "translate",
                  ),
                ] as const;
          }

          const tokens = [
            ...fallback(query),
            ...query
              .split(" ")
              .filter((token): token is stringful => token !== ""),
          ] as const;

          if (tokens.length === 0)
            throw new RangeError("Empty search query");

          const [
            Head,
            ...tail
          ] = tokens;

          return {
            Head,
            tail: tail as stringful[],
          };
        }

        const OPERATORS = {
          digit: "0123456789",
          leading: "+-$€£¥.(",
          rest: "%°¢/*^!,:)",
        },
        tokens = tokenize(query),
        {
          Head,
          tail,
        } = tokens;

        return typeof Head === "string"
          && new Set(
            OPERATORS.digit
            + OPERATORS.leading,
          )
            .has(
              Head[0] as string,
            )
          ? {
              Head: new ReservedSearchQueryKey("math"),
              tail: [
                Head,
                ...tail,
              ],
            }
          : {
              Head,
              tail,
            };
      }

      const tokens = expand(query),
      {
        Head,
        tail,
      } = tokens;

      if (typeof Head !== "string")
        return {
          Head,
          tail,
        };
      else {
        const DOT = "." as char;

        SELECTORS.delete(DOT);
        SELECTORS.add(DOT);

        const selectors = [...SELECTORS],
        match = selectors
          .find(
            selector => Head
              .includes(
                selector,
              ),
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
          ] = Head
            .split(
              match,
            ),
          selection = selectionShards
            .join(
              match,
            );

          return key === ""
            ? {
                Head: new ReservedSearchQueryKey("translate"),
                tail: [
                  [
                    canonical,
                    selection === ""
                    && match === DOT
                      ? tail.shift() ?? ""
                      : selection,
                  ]
                    .join("") as stringful,
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

    const {
      Head,
      tail,
    } = select(
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
        .exec(
          Head,
        );

      if (operation === null)
        return {
          Head,
          tail,
        } as const;
      else {
        const [
          ,
          key,
          operand,
        ] = operation as unknown as Triad<stringful>;

        return {
          Head: key,
          tail: [
            operand,
            ...tail,
          ],
        };
      }
    }
  }

  const {
    Head,
    tail,
  } = parse(
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
    };
  else {
    function dealias(
      engines: Set<string>,
      key = "",
    ) {
      if (key === "")
        throw TypeError(
          "Engine key must be stringful",
          {
            cause: "Unstringful aliased engine",
          },
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
        ? dealias(
            engines,
            alias[head],
          )
        : null;

    return key === null
      ? {
          key: "chat" as stringful,
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
        };
  }
}

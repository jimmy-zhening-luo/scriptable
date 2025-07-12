export type { SearchOutput } from "./output";
export type { SearchSetting } from "./setting";

class ReservedSearchQueryKey<
  Key extends string,
> {
  public readonly key;

  constructor(
    key: Literalful<Key>,
  ) {
    this.key = key as unknown as stringful;
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
    ].join("") as stringful;
  }
}

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
          } as const;
        }

        const OPERATORS = {
          digit: "0123456789",
          leading: "+-$€£¥.(",
          rest: "%°¢/*^!,:)",
        },
        {
          Head,
          tail,
        } = tokenize(query);

        return typeof Head !== "string"
          ? {
              Head,
              tail,
            } as const
          : new Set(
            OPERATORS.digit
            + OPERATORS.leading,
          ).has(Head[0])
            ? {
                Head: new ReservedSearchQueryKey("math"),
                tail: [
                  Head,
                  ...tail,
                ],
              } as const
            : {
                Head,
                tail,
              } as const;
      }

      const {
        Head,
        tail: inferredTail,
      } = expand(query),
      tail = [...inferredTail];

      if (typeof Head !== "string")
        return {
          Head,
          tail,
        } as const;
      else {
        const DOT = "." as char;

        SELECTORS.delete(DOT);
        SELECTORS.add(DOT);

        const selectors = [...SELECTORS],
        match = selectors.find(
          selector => Head.includes(
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
            .split(match),
          selection = selectionShards
            .join(match);

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
                  ].join("") as stringful,
                  ...tail,
                ],
              } as const
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
              } as const;
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
      } as const;
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
        } as const;
      }
    }
  }

  const {
    Head,
    tail,
  } = parse(
    query,
    SELECTORS,
  ),
  whyNoInfer = Head as (
    | typeof Head
    | SearchQuerySelectionCandidate
  );

  if (
    typeof whyNoInfer !== "string"
    && !("selection" in whyNoInfer)
  )
    return {
      key: whyNoInfer.key,
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
      typeof whyNoInfer === "string"
        ? whyNoInfer
        : whyNoInfer.key
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
            typeof whyNoInfer === "string"
              ? whyNoInfer
              : whyNoInfer.deselect,
            ...tail,
          ],
        }
      : {
          key,
          terms: typeof whyNoInfer === "string"
            ? tail
            : [
                whyNoInfer.selection,
                ...whyNoInfer.consumes
                  ? tail.slice(1)
                  : tail,
              ],
        };
  }
}

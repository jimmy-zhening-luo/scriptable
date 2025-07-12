export type { SearchOutput } from "./output";
export type { SearchSetting } from "./setting";
export default function (
  query: string,
  engines: Set<string>,
  alias: FieldTable,
  SELECTORS: Set<char>,
) {
  function select(
    query: string,
    SELECTORS: Set<char>,
  ) {
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
          throw new RangeError("No search query");

        const [T0, ...Tn] = tokens;

        return [T0, ...Tn as stringful[]] as const;
      }

      const OPERATORS = {
        digit: "0123456789",
        leading: [
          "+-",
          "$€£¥",
          ".",
          "(",
        ]
          .join(""),
        rest: [
          "%°¢",
          "/*^!",
          ",:",
          ")",
        ]
          .join(""),
      } as const,
      [T0, ...Tn] = tokenize(query);

      return typeof T0 !== "string"
        ? [T0, ...Tn] as const
        : new Set(
          OPERATORS.digit
          + OPERATORS.leading,
        ).has(
          T0[0],
        )
          ? [
              new ReservedSearchQueryKey("math"),
              T0,
              ...Tn,
            ] as const
          : [T0, ...Tn] as const;
    }

    const [T0, ...Tn] = expand(query);

    if (typeof T0 !== "string")
      return {
        Head: T0,
        tail: Tn,
      };
    else {
      const DOT = "." as char;

      SELECTORS.delete(DOT);
      SELECTORS.add(DOT);

      const selectors = [...SELECTORS],
      match = selectors.find(
        selector => T0.includes(
          selector,
        ),
      );

      if (match === undefined)
        return {
          Head: T0,
          tail: Tn,
        };
      else {
        const canonical = selectors[0]!,
        [
          key = "",
          ...selectionShards
        ] = T0
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
                    ? Tn.shift() ?? ""
                    : selection,
                ].join("") as stringful,
                ...Tn,
              ] as const,
            } as const
          : {
              Head: new SearchQuerySelectionCandidate(
                key as stringful,
                {
                  canonical,
                  match,
                },
                selection,
                Tn.at(0) ?? "",
                T0,
              ),
              tail: Tn,
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

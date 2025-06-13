export type { SearchOutput } from "./output";
export type { SearchSetting } from "./setting";
export default function (
  query: string,
  engines: Set<string>,
  alias: FieldTable,
  FALLBACKS: Arrayful<stringful, true>,
  OPERATORS: stringful,
  SELECTORS: Set<char>,
) {
  function select(
    query: string,
    FALLBACKS: Arrayful<stringful, true>,
    OPERATORS: stringful,
    SELECTORS: Set<char>,
  ) {
    class KnownSearchQueryToken {
      constructor(
        public readonly token: stringful,
      ) {}
    }
  
    class ReservedSearchQueryToken<
      Token extends string,
    > extends KnownSearchQueryToken {
      constructor(
        public readonly reserved: Literalful<Token>,
      ) {
        super(
          reserved as unknown as stringful,
        );
      }
    }
  
    class SearchQuerySelection {
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

    function expand(
      query: string,
      FALLBACKS: Arrayful<stringful, true>,
      OPERATORS: stringful,
    ) {
      function tokenize(
        query: string,
        FALLBACKS: Arrayful<stringful, true>,
      ) {
        function fallback(
          query: string,
          FALLBACKS: Arrayful<stringful, true>,
        ) {
          const frontage = query.length - query.trimStart().length;

          return frontage > 0
            ? [
                new KnownSearchQueryToken(
                  FALLBACKS.at(frontage - 1)
                  ?? FALLBACKS.at(-1)!,
                ),
              ] as const
            : [] as const;
        }

        const tokens = [
          ...fallback(query, FALLBACKS),
          ...query
            .split(" ")
            .filter((token): token is stringful => token !== ""),
        ] as const;

        if (tokens.length === 0)
          throw new RangeError("No search query");

        const [T0, ...Tn] = tokens;

        return [T0, ...Tn as stringful[]] as const;
      }

      const tokens = tokenize(
        query,
        FALLBACKS,
      ),
      [T0, ...Tn] = tokens;

      if (typeof T0 !== "string")
        return tokens;
      else {
        const [t00, t01] = T0;

        return t00 >= "0"
          && t00 <= "9"
          || OPERATORS.includes(t00)
          || typeof t01 !== "undefined"
          && !Number.isNaN(
            Number(t00 + t01),
          )
          ? [
              new ReservedSearchQueryToken(
                "math",
              ),
              T0,
              ...Tn,
            ] as const
          : tokens;
      }
    }

    const tokens = expand(
      query,
      FALLBACKS,
      OPERATORS,
    ),
    [T0, ...Tn] = tokens;

    if (typeof T0 !== "string")
      return tokens;
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

      if (typeof match === "undefined")
        return tokens;
      else {
        const canonical = selectors[0]!,
        [
          key = "",
          ...selectionShards
        ] = T0
          .split(match),
        selection = selectionShards
          .join(match);

        return [
          ...key === ""
            ? [
                new ReservedSearchQueryToken(
                  "translate",
                ),
                [
                  canonical,
                  selection === ""
                  && match === DOT
                    ? Tn.shift() ?? ""
                    : selection,
                ].join("") as stringful,
              ] as const
            : [
                new SearchQuerySelection(
                  key as stringful,
                  {
                    canonical,
                    match,
                  },
                  selection,
                  Tn.at(0) ?? "",
                  T0,
                ),
              ] as const,
          ...Tn,
        ] as const;
      }
    }
  }

  const [
    Head,
    ...terms
  ] = select(
    query,
    FALLBACKS,
    OPERATORS,
    SELECTORS,
  );

  if (
    typeof Head !== "string"
    && "token" in Head
  )
    return {
      key: Head.token,
      terms,
    };
  else {
    const head = (
      typeof Head === "string"
        ? Head
        : Head.key
    )
      .toLocaleLowerCase() as stringful,
    key = engines.has(head)
      ? head
      : head in alias
        && alias[head] !== ""
        ? alias[head] as stringful
        : null;

    return key === null
      ? {
          key: "chat" as stringful,
          terms: [
            typeof Head === "string"
              ? Head
              : Head.deselect,
            ...terms,
          ],
        }
      : {
          key,
          terms: typeof Head === "string"
            ? terms
            : [
                Head.selection,
                ...Head.consumes
                  ? terms.slice(1)
                  : terms,
              ],
        };
  }
}

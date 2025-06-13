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

    const [T0, ...Tn] = expand(
      query,
      FALLBACKS,
      OPERATORS,
    );

    if (typeof T0 !== "string")
      return {
        Headword: T0,
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

      if (typeof match === "undefined")
        return {
          Headword: T0,
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
              Headword: new ReservedSearchQueryToken(
                "translate",
              ),
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
              Headword: new SearchQuerySelection(
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
    Headword,
    tail,
  } = select(
    query,
    FALLBACKS,
    OPERATORS,
    SELECTORS,
  );

  if (
    typeof Headword !== "string"
    && "token" in Headword
  )
    return {
      key: Headword.token,
      terms: tail,
    };
  else {
    const headword = (
      typeof Headword === "string"
        ? Headword
        : Headword.key
    )
      .toLocaleLowerCase() as stringful,
    key = engines.has(headword)
      ? headword
      : headword in alias
        && alias[headword] !== ""
        ? alias[headword] as stringful
        : null;

    return key === null
      ? {
          key: "chat" as stringful,
          terms: [
            typeof Headword === "string"
              ? Headword
              : Headword.deselect,
            ...tail,
          ],
        }
      : {
          key,
          terms: typeof Headword === "string"
            ? tail
            : [
                Headword.selection,
                ...Headword.consumes
                  ? tail.slice(1)
                  : tail,
              ],
        };
  }
}

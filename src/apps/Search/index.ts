export type { SearchOutput } from "./output";
export type { SearchSetting } from "./setting";
export default function (
  query: string,
  engines: Set<string>,
  alias: FieldTable,
  FALLBACKS: Arrayful<stringful, true>,
  SELECTORS: Set<char>,
) {
  function select(
    query: string,
    FALLBACKS: Arrayful<stringful, true>,
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
        const [t00] = T0,
        OPERATORS = {
          digit: "0123456789",
          leading: {
            sign: "+-",
            unit: "$€£¥",
            dot: ".",
            paren: "(",
          },
          rest: {
            unit: "%°¢",
            operator: "/*^!",
            comma: ",",
            paren: ")",
          },
        } as const,
        DIGIT = OPERATORS.digit,
        LEADING = OPERATORS.leading.sign
          + OPERATORS.leading.unit
          + OPERATORS.leading.dot
          + OPERATORS.leading.paren,
        digits = new Set(DIGIT),
        leading = new Set(LEADING);

        return digits.has(t00)
          || leading.has(t00)
          && [...T0]
            .some(
              char => digits.has(char),
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

      if (match === undefined)
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

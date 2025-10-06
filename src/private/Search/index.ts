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
      class SearchSelection {
        public readonly consumes;
        public readonly selection;

        constructor(
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

        public select(tail: stringful[]) {
          return [
            this.selection,
            ...this.consumes
              ? tail.slice(1)
              : tail,
          ];
        }
      }

      class SearchKey {
        constructor(
          public readonly key: stringful,
          public readonly selection: Null<SearchSelection> = null,
          public readonly verified = false,
        ) {}
      }

      class ReservedSearchKey<
        Reserved extends
        | "math"
        | "chat"
        | "translate",
      > extends SearchKey {
        constructor(
          public readonly reserved: Reserved,
          selection: Null<SearchSelection> = null,
        ) {
          super(
            reserved as stringful,
            selection,
            true,
          );
        }
      }

      function expand(query: string) {
        function tokenize(query: string) {
          function hotkey(query: string) {
            switch (query.length - query.trimStart().length) {
            case 0:
              return [] as const;
            case 1:
              return [new ReservedSearchKey("chat")] as const;
            default:
              return [new ReservedSearchKey("translate")] as const;
            }
          }

          const tokens = [
            ...hotkey(query),
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
              Head: new ReservedSearchKey("math"),
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
        void SELECTORS.add("." as char);

        const selectors = [...SELECTORS],
        HEAD = new Set(Head),
        match = selectors.find(
          selector => HEAD.has(selector),
        );

        if (match === undefined)
          return {
            Head,
            tail,
          };
        else {
          const canonical = selectors[0]!,
          iSelector = Head.indexOf(match),
          key = Head.slice(0, iSelector),
          selection = new SearchSelection(
            {
              canonical,
              match,
            },
            Head.slice(iSelector + 1),
            tail.at(0) ?? "",
            Head,
          );

          return {
            Head: key === ""
              ? new ReservedSearchKey(
                  "translate",
                  selection,
                )
              : new SearchKey(
                  key as stringful,
                  selection,
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
    && "engine" in Head
  )
    return {
      key: Head.engine as stringful,
      terms: Head.selection === null
        ? tail
        : Head.selection.select(tail),
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
                || Head.selection === null
                ? Head
                : Head.deselect,
              ...tail,
            ],
          }
        : {
            key,
            terms: typeof Head === "string"
              || Head.selection === null
              ? tail
              : Head.selection.select(tail),
          },
    };
  }
}

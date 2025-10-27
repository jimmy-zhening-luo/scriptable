export type { SearchOutput } from "./output";
import type { SearchSetting } from "./setting";

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
    public readonly deselect: stringful,
    next = "",
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
    public readonly selection?: SearchSelection,
  ) {}
}

class ReservedSearchKey extends SearchKey {
  constructor(
    public readonly reserved: keyof SearchSetting["reserved"]["keys"],
    selection?: SearchSelection,
  ) {
    super(
      reserved as stringful,
      selection,
    );
  }
}

export type { SearchSetting };
export default function (
  query: string,
  engines: Set<string>,
  alias: FieldTable,
  RESERVED: Record<
    (
      | "chat"
      | "math"
      | "skip"
      | "translate"
    ),
    stringful
  >,
  selectors: string,
) {
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
              ? tail.pop()
              : hotkeys === 1
                ? new ReservedSearchKey("chat")
                : new ReservedSearchKey("translate"),
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
              Head: new ReservedSearchKey("math"),
              tail: [Head].concat(tail),
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
        selectorful = selectors.concat(".") as stringful,
        SELECTORS = new Set<char>(selectorful satisfies stringful as unknown as char[]),
        match = SELECTORS
          .values()
          .find(
            selector => HEAD.has(selector),
          );

        if (match === undefined)
          return {
            Head,
            tail,
          };
        else {
          const canonical = selectorful[0],
          i = Head.indexOf(match),
          key = Head.slice(0, i),
          selection = new SearchSelection(
            {
              canonical,
              match,
            },
            Head.slice(i + 1),
            Head,
            tail[0],
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
          tail: [operand].concat(tail),
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
    && "reserved" in Head
  )
    return {
      key: RESERVED[Head.reserved],
      terms: Head
        .selection
        ?.select(tail)
        ?? tail,
    };
  else {
    function dealias(
      engines: Set<string>,
      key = "",
    ) {
      if (key === "")
        throw TypeError("Aliased engine key is empty");
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
          key: RESERVED[
            tail.length === 0
              ? "skip"
              : "chat"
          ],
          terms: [
            typeof Head === "string"
              ? Head
              : Head
                .selection
                ?.deselect
                ?? Head.key,
            ...tail,
          ],
        }
      : {
          key,
          terms: typeof Head === "string"
            || Head.selection === undefined
            ? tail
            : Head.selection.select(tail),
        };
  }
}

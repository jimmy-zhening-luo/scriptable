import type { SearchEngineSetting } from "./engine";

export interface SearchSetting {
  tags: Field<
    | "query"
  >;
  reserved: Field<
    | "selector"
    | "operators"
  >;
  defaults: Field<
    | "math"
    | "translate"
  > & {
    fallback: Triad;
  };
  alias: FieldTable;
  engines: Table<
    | Unflat<string, false>
    | SearchEngineSetting<"find">
    | SearchEngineSetting<
      "shortcut",
      | "output"
      | "select"
    >
    | SearchEngineSetting<
      "api",
      "encodeComponent",
      never,
      Field<never, "separator">
    >
    | SearchEngineSetting<
      "url",
      | "encodeComponent"
      | "force"
      | "inprivate",
      never,
      Field<never, "separator">,
      Unflat<string, false>
    >
  >;
}

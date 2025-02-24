import type { SearchEngineSetting } from "./engine";

export interface SearchSetting {
  readonly tags: Field<
    | "query"
  >;
  readonly reserved: Field<
    | "selector"
    | "operators"
  >;
  readonly defaults: Field<
    | "math"
    | "chat"
    | "translate"
  > & {
    readonly fallback: Triad;
  };
  readonly alias: FieldTable;
  readonly engines: Table<
    | Unflat<string, true>
    | Record<string, never>
    | SearchEngineSetting<"find">
    | SearchEngineSetting<
      "shortcut",
      | "notify"
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
      Unflat
    >
  >;
}

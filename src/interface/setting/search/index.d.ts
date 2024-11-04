declare interface SearchSetting {
  tag: string;
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
    | string
    | (string | Field<"scheme">)[]
    | SearchEngineSetting<"find">
    | SearchEngineSetting<
      "shortcut",
      | "output"
      | "select"
    >
    | SearchEngineSetting<
      "url",
      | "encodeComponent"
      | "api"
      | "force"
      | "inprivate"
      ,
      never,
      Field<never, "separator">,
      | string
      | (string | Field<"scheme">)[]
    >
  >;
}

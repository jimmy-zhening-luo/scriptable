declare interface SearchSetting {
  tags: Field<
    | "query"
    | "location"
  >;
  reserved: Field<
    | "replacer"
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
      "url",
      | "encodeComponent"
      | "api"
      | "force"
      | "inprivate"
      ,
      never,
      Field<never, "separator">,
      Unflat<string, false>
    >
  >;
}

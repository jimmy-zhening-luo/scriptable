declare interface SearchSetting {
  tag: string;
  reserved: Field<
    | "selector"
    | "operators"
    | "replace"
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

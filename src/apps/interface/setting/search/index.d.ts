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
      | "inprivate"
      ,
      never,
      Field<never, "separator"> & {
        browser?:
          | "api"
          | "force"
        ;
      },
      true
    >
  >;
}

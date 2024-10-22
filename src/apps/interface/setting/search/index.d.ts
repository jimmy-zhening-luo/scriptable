declare interface SearchSetting {
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
      {
        browser?:
          | "api"
          | "force"
        ;
        separator?: "%20";
      },
      true
    >
  >;
  alias: FieldTable;
  reserved: {
    tag: string;
    selector: string;
    key: Field<
      | "chat"
      | "translate"
      | "math"
    >;
    fallback: Quad;
  };
}

declare interface SearchSetting {
  app: {
    tag: string;
    selector: string;
    key: Field<
      | "chat"
      | "translate"
      | "math"
    >;
    fallback: Field<
      | "one"
      | "two"
      | "three"
      | "rest"
    >;
  };
  user: {
    alias: FieldTable;
    engines: Table<
      | Unflat<string, false>
      | SearchEngineSetting<"find">
      | SearchEngineSetting<"shortcut", "output">
      | SearchEngineSetting<
        "url",
        | "encodeComponent"
        | "inprivate"
        ,
        never,
        & {
          browser?: "api" | "force";
          separator?: "%20";
        }
        ,
        true
      >
    >;
  };
}

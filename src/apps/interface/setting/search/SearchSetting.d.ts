declare type SearchSetting = {
  app: {
    tag: string;
    key: Field<
      | "chat"
      | "translate"
      | "mathShort"
      | "mathLong"
    >;
    fallback: Field<
      | "rest"
      | "one"
      | "two"
      | "three"
    >;
  };
  user: {
    alias: FieldTable;
    engines: Table<
      | Unflat<string, false>
      | ISearchEngineSetting<"find">
      | ISearchEngineSetting<"shortcut", true>
      | ISearchEngineSetting<
        "url",
        true,
        "encodeComponent",
        never,
        & PartialRecord<
          "browser",
          | "api"
          | "force"
        >
        & PartialRecord<"separator", "%20">
        ,
        true
      >
    >;
  };
};

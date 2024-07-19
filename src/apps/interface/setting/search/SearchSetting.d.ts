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
      | SearchEngineSetting<"find">
      | SearchEngineSetting<"shortcut", true>
      | SearchEngineSetting<
        "url",
        true,
        | "encodeComponent"
        | "inprivate"
        ,
        never,
        & Particord<
          "browser",
          | "api"
          | "force"
        >
        & Particord<"separator", "%20">
        ,
        true
      >
    >;
  };
};

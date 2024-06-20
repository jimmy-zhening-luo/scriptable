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
      | Unflat<
        string
      >
      | UrlEngineSetting
      | ISearchEngineSetting<
        "find"
      >
      | ISearchEngineSetting<
        "shortcut"
        ,
        | "output"
        | "write"
        ,
        | "postfix"
      >
    >;
  };
};

declare type FilelinkSetting = {
  app: Field<
    | "scheme"
    | "commonRoot"
  >;
  user: Record<
    "providers"
    ,
    Table<
      | FileProvider<false>
      | FileProvider<true>
    >
  >;
};

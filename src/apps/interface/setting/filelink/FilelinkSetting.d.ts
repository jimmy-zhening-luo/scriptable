declare type FilelinkSetting = {
  user: Record<
    "providers"
    ,
    Table<
      | FileProvider
      | FileProvider<true>
    >
  >;
};

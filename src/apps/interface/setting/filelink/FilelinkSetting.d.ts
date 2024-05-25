declare type FilelinkSetting = {
  user: Record<
    "providers"
    ,
    Table<
      | FileProvider<false>
      | FileProvider<true>
    >
  >;
};

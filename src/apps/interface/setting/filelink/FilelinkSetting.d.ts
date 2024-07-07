declare type FilelinkSetting =
  & Field<
    | "scheme"
    | "commonRoot"
  >
  & Record<
    "providers"
    ,
    Table<
      | FileProvider<false>
      | FileProvider<true>
    >
  >
;

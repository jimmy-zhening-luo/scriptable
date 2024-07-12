declare type FilelinkSetting =
  & { providers: Table<FileProvider<true> | FileProvider<false>> }
  & Field<
    | "scheme"
    | "commonRoot"
  >
;

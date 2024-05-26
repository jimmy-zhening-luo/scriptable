declare type UrlEngineSetting =
  & ISearchEngineSetting<
    "url"
    ,
    | "encodeComponent"
    ,
    true,
  >
  & PartialRecord<
    "browser"
    ,
    | "api"
    | "force"
  >
  & PartialRecord<
    "separator"
    ,
    | "%20"
  >
;

declare type UrlEngineSetting =
  & ISearchEngineSetting<
    "url"
    ,
    | "encodeComponent"
    ,
    | "postfix"
    ,
    true
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

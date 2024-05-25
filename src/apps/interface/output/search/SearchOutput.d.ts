declare type SearchOutput =
  & Field<
    "app"
  >
  & Listish<
    "action"
  >
  & Field<
    | "natural"
    | "shortcut"
    | "find"
    ,
    true
  >
  & Flag<
    "output"
  >
  & PartialRecord<
    "browser"
    ,
    UrlEngine["browser"]
  >
;

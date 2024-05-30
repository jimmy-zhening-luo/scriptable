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
    | "output"
    | "write"
  >
  & PartialRecord<
    "browser"
    ,
    UrlEngine["browser"]
  >
;

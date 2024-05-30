declare type SearchOutput =
  & Listish<
    "action"
  >
  & Field<
    | "app"
    | "postfix"
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

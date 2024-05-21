declare type SearchOutput =
  & Field<
    "app"
  >
  & Record<
    "action"
    ,
    | string
    | string[]
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

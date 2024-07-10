declare type SearchOutput =
  & Listish<"action">
  & Field<
    | "app"
    | "output"
    ,
    | "output"
  >
  & Field<
    | "shortcut"
    | "find"
    ,
    true
  >
  & Field<
    | "natural"
    | "browser"
    ,
    true
  >
;

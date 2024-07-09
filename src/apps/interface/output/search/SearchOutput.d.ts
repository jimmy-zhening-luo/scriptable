declare type SearchOutput =
  & Listish<"action">
  & Field<
    | "app"
    | "output"
    ,
    | "output"
  >
  & Field<
    | "shortcut" // Shortcut
    | "find" // Find
    ,
    true
  >
  & Field< // Url
  | "natural"
  | "browser"
    ,
    true
  >
;

declare type SearchOutput =
  & { action: Unflat }
  & Field<
    "app",
    | "shortcut"
    | "find"
    | "natural"
    | "browser"
  >
  & Flag<
    | "inprivate"
    | "output"
  >
;

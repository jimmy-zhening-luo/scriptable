declare type SearchOutput =
  & { action: Unflat }
  & Field<
    "app",
    | "output"
    | "shortcut"
    | "find"
    | "natural"
    | "browser"
  >
  & Flag<"inprivate">
;

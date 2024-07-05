declare type SearchOutput =
  & Listish<"action">
  & Field<
    | "app"
    | "output"
  >
  & Field<
    | "shortcut" // Shortcut
    | "find" // Find
    ,
    true
  >
  & { // URL
    natural?: string;
    browser?:
      | "api"
      | "force"
    ;
  }
;

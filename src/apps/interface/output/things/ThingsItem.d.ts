declare type ThingsItem =
  & Field<
    | "title"
    | "notes"
    | "triage"
    | "list"
    ,
    | "list"
  >
  & List<
    "tags"
    ,
    true
  >
  & {
    when?:
      | "today"
      | "someday"
    ;
  }
;

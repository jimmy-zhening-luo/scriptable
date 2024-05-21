declare type ThingsItem =
  & Record<
    | "title"
    | "notes"
    | "triage"
    ,
    string
  >
  & {
    list?: string;
    when?:
      | "today"
      | "someday"
    ;
  }
;

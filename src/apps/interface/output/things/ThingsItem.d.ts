declare type ThingsItem =
  & Field<
    | "title"
    | "notes"
    | "triage"
  >
  & {
    list?: string;
    when?:
      | "today"
      | "someday"
    ;
  }
;
